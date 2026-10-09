import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('technova_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear expired token if necessary
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        // localStorage.removeItem('technova_token');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  updateTargetRole: (targetRole) => api.put('/profile/target-role', { targetRole }),
  completeOnboarding: (data) => api.post('/profile/onboarding', data),
};

export const resumeAPI = {
  uploadResume: (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  confirmExtraction: (data) => api.post('/resume/confirm', data),
};

export const githubAPI = {
  analyzeProfile: (username) => api.post('/github/analyze', { username }),
  syncSkills: (data) => api.post('/github/sync', data),
};

export const skillAPI = {
  getGaps: () => api.get('/skills'),
  updateEvidence: (data) => api.post('/skills/evidence', data),
  getGraph: () => api.get('/skills/graph'),
};

export const roadmapAPI = {
  getRoadmap: () => api.get('/roadmap'),
  updateStatus: (data) => api.post('/roadmap/milestone/status', data),
  recalculate: () => api.post('/roadmap/recalculate'),
};

export const missionAPI = {
  getMissions: () => api.get('/missions'),
  startMission: (id) => api.post(`/missions/${id}/start`),
  submitMission: (id, data) => api.post(`/missions/${id}/submit`, data),
};

export const interviewAPI = {
  startSession: (data) => api.post('/interview/start', data),
  submitAnswer: (sessionId, data) => api.post(`/interview/session/${sessionId}/answer`, data),
  getSessionReport: (sessionId) => api.get(`/interview/session/${sessionId}`),
  getHistory: () => api.get('/interview/history'),
};

export const readinessAPI = {
  getSnapshot: () => api.get('/readiness'),
};

export const demoAPI = {
  loadSample: () => api.post('/demo/load-sample'),
  getHealth: () => api.get('/demo/health'),
};

export default api;
