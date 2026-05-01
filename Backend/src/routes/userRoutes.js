const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

// Get user profile
router.get( '/me' , authMiddleware.authMiddleware, userController.getUserProfile ) ;

// Update user profile (Onboarding 'Blueprint')
router.patch( '/profile' , authMiddleware.authMiddleware , userController.updateUserProfile ) ;     

// Upload Avatar
router.post('/upload-avatar', authMiddleware.authMiddleware, upload.single('avatar'), userController.uploadAvatar);


module.exports = router ;