const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, missionController.getMissions);
router.post('/:missionId/start', authenticate, missionController.startMission);
router.post('/:missionId/submit', authenticate, missionController.submitMission);

module.exports = router;
