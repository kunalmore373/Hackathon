const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get( '/me' , userController.getUserProfile ) ;

// Update user profile (Onboarding 'Blueprint')