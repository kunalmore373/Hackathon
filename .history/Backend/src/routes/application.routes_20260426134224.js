const express = require('express');
const router = express.Router() ;
const applicationController = require('../controllers/applicationController') ;
const authMiddleware = require('../middleware/authMiddleware') ;

// Create a new application (Shortlist a university)
