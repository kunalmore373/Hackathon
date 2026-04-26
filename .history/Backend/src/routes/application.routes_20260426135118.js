const express = require('express');
const router = express.Router() ;
const applicationController = require('../controllers/applicationController') ;
const authMiddleware = require('../middleware/authMiddleware') ;

// Create a new application (Shortlist a university)
router.post('/' , authMiddleware , applicationController.createApplication) ;
// Get all applications for the logged-in user (For Dashboard)
router.get('/me' , authMiddleware , applicationController.getMyApplications) ;
// Update application status (e.g., move from Shortlisted -> Applying)
router.patch('/:id/status' , authMiddleware. , applicationController.updateApplicationStatus) ;

module.exports = router ;
