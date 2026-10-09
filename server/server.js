const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const githubRoutes = require('./routes/githubRoutes');
const skillGapRoutes = require('./routes/skillGapRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const missionRoutes = require('./routes/missionRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const readinessRoutes = require('./routes/readinessRoutes');
const demoRoutes = require('./routes/demoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/', limiter);

// Serve uploads statically if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/skills', skillGapRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/readiness', readinessRoutes);
app.use('/api/demo', demoRoutes);

const fs = require('fs');

// Root route
app.get('/api', (req, res) => {
  res.json({
    name: 'Hyper-Personalized AI Career Co-Pilot API',
    team: 'Technova001',
    college: 'Kanpur Institute of Technology',
    version: '1.0.0',
    documentation: '/api/demo/health'
  });
});

// Serve Frontend in Production / Bundled Mode if client/dist exists
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Centralized Error Handling Middleware
app.use(errorHandler);

// Initialize DB and Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 Technova001 AI Career Co-Pilot API Server`);
    console.log(`🏛️ Kanpur Institute of Technology | Team Technova001`);
    console.log(`🌐 Server running at: http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
    console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/demo/health`);
    console.log(`=======================================================`);
  });
}

startServer();

module.exports = app;
