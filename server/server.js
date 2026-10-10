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

// Enable trust proxy for Render load balancers & reverse proxies
app.set('trust proxy', 1);

// Security & Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Dynamic CORS configuration for Vercel, localhost, and custom domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(s => s.trim()) : [])
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile, postman, render health monitor, curl)
    if (!origin) return callback(null, true);

    // Allow all vercel preview and production subdomains
    try {
      const parsed = new URL(origin);
      if (parsed.hostname.endsWith('.vercel.app')) {
        return callback(null, true);
      }
    } catch (e) {
      // ignore parse error
    }

    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes('*') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    // Permissive fallback to prevent breaking cross-origin hackathon reviews
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/', limiter);

// Serve uploads statically if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint for Render / Uptime monitors
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Technovoo1 Career Co-Pilot API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Root API info route
app.get('/api', (req, res) => {
  res.json({
    name: 'Hyper-Personalized AI Career Co-Pilot API',
    team: 'Technovoo1',
    version: '1.0.0',
    documentation: '/api/demo/health'
  });
});

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

// Root route (friendly landing or status when running standalone on Render)
const clientDistPath = path.join(__dirname, '../client/dist');
app.get('/', (req, res, next) => {
  if (!fs.existsSync(clientDistPath)) {
    return res.status(200).json({
      name: 'Hyper-Personalized AI Career Co-Pilot API Server',
      team: 'Technovoo1',
      version: '1.0.0',
      status: 'online',
      endpoints: {
        api: '/api',
        health: '/health',
        demoHealth: '/api/demo/health'
      }
    });
  }
  next();
});

// Serve Frontend in Production / Bundled Mode if client/dist exists
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
    console.log(`🚀 Technovoo1 AI Career Co-Pilot API Server`);
    console.log(`💡 Principle: Evidence Before Inference | Team Technovoo1`);
    console.log(`🌐 Server running at: http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
    console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/demo/health`);
    console.log(`=======================================================`);
  });
}

startServer();

module.exports = app;
