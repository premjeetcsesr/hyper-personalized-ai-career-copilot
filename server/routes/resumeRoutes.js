const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', authenticate, upload.single('resume'), resumeController.uploadAndAnalyzeResume);
router.post('/confirm', authenticate, resumeController.confirmResumeExtraction);

module.exports = router;
