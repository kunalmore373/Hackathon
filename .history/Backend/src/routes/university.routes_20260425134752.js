const express = require('express');
const router = express.Router();
const univerityController = require('../controllers/university.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Get all universities
router.get ( '/' , authMiddleware.authMiddleware , University.)