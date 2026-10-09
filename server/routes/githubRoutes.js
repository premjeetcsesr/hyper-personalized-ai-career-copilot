const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const { authenticate } = require('../middleware/auth');

router.post('/analyze', authenticate, githubController.analyzeGitHubProfile);
router.post('/sync', authenticate, githubController.syncGitHubSkills);

module.exports = router;
