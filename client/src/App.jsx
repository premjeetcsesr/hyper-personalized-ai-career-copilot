import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CareerDataProvider } from './context/CareerDataContext';
import AppLayout from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ExploreCareersPage from './pages/ExploreCareersPage';
import ProfilePage from './pages/ProfilePage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import MissionsPage from './pages/MissionsPage';
import MockInterviewPage from './pages/MockInterviewPage';
import InterviewReportPage from './pages/InterviewReportPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

// Utilities
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import GitHubAnalyzerPage from './pages/GitHubAnalyzerPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="app-loading-screen">
        <div className="app-loading-spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <CareerDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* Application Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="explore" element={<ExploreCareersPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="skills" element={<SkillGapPage />} />
              <Route path="roadmap" element={<RoadmapPage />} />
              <Route path="projects" element={<MissionsPage />} />
              <Route path="missions" element={<MissionsPage />} />
              <Route path="interview" element={<MockInterviewPage />} />
              <Route path="interview/:sessionId" element={<InterviewReportPage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="readiness" element={<ProgressPage />} />
              <Route path="settings" element={<SettingsPage />} />

              {/* Preserved Evidence Extraction Utilities */}
              <Route path="resume" element={<ResumeAnalyzerPage />} />
              <Route path="github" element={<GitHubAnalyzerPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CareerDataProvider>
    </AuthProvider>
  );
}
