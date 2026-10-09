const express = require('express');
const router = express.Router();
const readinessController = require('../controllers/readinessController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, readinessController.getReadinessSnapshot);

module.exports = router;
