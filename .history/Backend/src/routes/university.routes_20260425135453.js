const express = require('express');
const router = express.Router();
const universityController = require('../');
const authMiddleware = require('../middleware/authMiddleware');

// Get all universities
router.get ( '/' , authMiddleware.authMiddleware , universityController.getUniversities ) ;

// Get university by ID
router.get ( '/:id' , authMiddleware.authMiddleware , universityController.getUniversityById ) ;

module.exports = router ;