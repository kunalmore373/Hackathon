const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/user/register' , authController.register);

// Login
router.post('/user/login' , authController.login);

module.exports = router;