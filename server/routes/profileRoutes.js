const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, profileController.getProfile);
router.put('/', authenticate, profileController.updateProfile);
router.put('/target-role', authenticate, profileController.updateTargetRole);
router.post('/onboarding', authenticate, profileController.completeOnboarding);

module.exports = router;
