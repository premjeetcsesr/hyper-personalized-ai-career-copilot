const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, roadmapController.getRoadmap);
router.post('/milestone/status', authenticate, roadmapController.updateMilestoneStatus);
router.post('/recalculate', authenticate, roadmapController.recalculateRoadmap);

module.exports = router;
