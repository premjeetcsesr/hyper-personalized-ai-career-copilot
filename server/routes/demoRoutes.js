const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');
const { getStatus } = require('../config/db');
const { getApiKeyStatus } = require('../services/aiService');

router.post('/load-sample', demoController.loadDemoData);

router.get('/health', (req, res) => {
  const dbStatus = getStatus();
  const aiStatus = getApiKeyStatus();

  res.json({
    success: true,
    platform: 'Hyper-Personalized AI Career Co-Pilot',
    team: 'Technova001',
    institution: 'Kanpur Institute of Technology',
    status: 'ONLINE',
    timestamp: new Date(),
    database: dbStatus,
    ai: aiStatus
  });
});

module.exports = router;
