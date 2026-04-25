const express = require('express');
const router = express.Router();


// Register
router.post('/user/register' , authController.register);

// Login
router.post('/user/login' , authController.login);