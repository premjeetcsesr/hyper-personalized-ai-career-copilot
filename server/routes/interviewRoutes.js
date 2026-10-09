const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { authenticate } = require('../middleware/auth');

router.post('/start', authenticate, interviewController.startInterview);
router.post('/session/:sessionId/answer', authenticate, interviewController.submitAnswerAndGetNext);
router.get('/session/:sessionId', authenticate, interviewController.getSessionReport);
router.get('/history', authenticate, interviewController.getInterviewHistory);

module.exports = router;
