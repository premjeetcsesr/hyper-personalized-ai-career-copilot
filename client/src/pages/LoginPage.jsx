import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const { login, loadDemoAccount } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/app');
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError('');
    const res = await loadDemoAccount();
    setDemoLoading(false);

    if (res.success) {
      navigate('/app');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <img src="/app-icon.svg" alt="AI Career Co-Pilot" className="auth-logo-img" />
          </div>
          <span className="auth-logo-text">AI Career Co-Pilot</span>
        </Link>
        <h2 className="auth-title">
          Sign In to Your Career Portal
        </h2>
        <p className="auth-subtitle">
          Team Technovoo1 • AI Career Co-Pilot
        </p>
      </div>

      <div className="auth-card-wrap">
        <Card>
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Button for Hackathon Judges */}
          <div className="auth-demo-banner">
            <span className="auth-demo-tag">
              For Hackathon Evaluators
            </span>
            <p className="auth-demo-desc">
              One-click instant access pre-loaded with sample resume, GitHub repositories, and full mock interview history.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleDemoLogin}
              loading={demoLoading}
              icon={Sparkles}
            >
              Sign In as Demo Student (Aarav Sharma)
            </Button>
          </div>

          <div className="auth-divider">
            <div className="auth-divider-line">
              <div className="auth-divider-border" />
            </div>
            <div className="auth-divider-text">
              <span>Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="navy"
              className="w-full"
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
