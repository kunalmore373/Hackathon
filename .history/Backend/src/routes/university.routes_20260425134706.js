const express = require('express');
const router = express.Router();
const University = require('../models/univerity.model');
const authMiddleware = require('../middleware/authMiddleware');

// Get all universities
router.get ( '')