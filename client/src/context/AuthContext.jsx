import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, demoAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('technovoo_token') || localStorage.getItem('technova_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    async function initAuth() {
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
          setProfile(res.data.profile);
          setIsDemoMode(!!res.data.user.isDemoUser);
        } catch (err) {
          console.warn('[AuthContext] Session invalid or expired.');
          localStorage.removeItem('technovoo_token');
          localStorage.removeItem('technova_token');
          setToken(null);
          setUser(null);
          setProfile(null);
        }
      }
      setIsLoading(false);
    }
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      const newToken = res.data.token;
      localStorage.setItem('technovoo_token', newToken);
      setToken(newToken);
      setUser(res.data.user);
      setProfile(res.data.profile);
      setIsDemoMode(!!res.data.user.isDemoUser);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.'
      };
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register({ name, email, password });
      const newToken = res.data.token;
      localStorage.setItem('technovoo_token', newToken);
      setToken(newToken);
      setUser(res.data.user);
      setProfile(res.data.profile);
      setIsDemoMode(false);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed.'
      };
    }
  };

  const loadDemoAccount = async () => {
    setIsLoading(true);
    try {
      const res = await demoAPI.loadSample();
      const newToken = res.data.token;
      localStorage.setItem('technovoo_token', newToken);
      setToken(newToken);
      setUser(res.data.user);
      setProfile(res.data.profile);
      setIsDemoMode(true);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to load hackathon demo scenario.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('technovoo_token');
    localStorage.removeItem('technova_token');
    setToken(null);
    setUser(null);
    setProfile(null);
    setIsDemoMode(false);
  };

  const refreshProfile = (newProfile) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      token,
      isLoading,
      isDemoMode,
      login,
      register,
      logout,
      loadDemoAccount,
      refreshProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
