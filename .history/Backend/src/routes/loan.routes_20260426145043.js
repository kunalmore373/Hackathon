const loanSimulationController = require('../controllers/loanSimulationController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Create or update loan simulation for a university
router.post('/:universityId', authMiddleware.authMiddleware, loanSimulationController.sa);