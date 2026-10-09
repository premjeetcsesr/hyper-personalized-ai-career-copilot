const express = require('express');
const router = express.Router();
const skillGapController = require('../controllers/skillGapController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, skillGapController.getSkillGaps);
router.post('/evidence', authenticate, skillGapController.updateSkillEvidence);
router.get('/graph', authenticate, skillGapController.getSkillGraph);

module.exports = router;
