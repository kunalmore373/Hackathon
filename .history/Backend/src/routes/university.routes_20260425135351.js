const express = require('express');
const router = express.Router();
const universityController = require('../controllers/university.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Get all universities
router.get ( '/' , authMiddleware.authMiddleware , univerityController.getUniversities ) ;

// Get university by ID
router.get ( '/:id' , authMiddleware.authMiddleware , univerityController.getUniversityById ) ;

module.exports = router ;