const loanSimulationController = require('../controllers/');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.route('/simulate')
    .get(authMiddleware.authMiddleware, loanSimulationController.getLoanSimulation)
    .post(authMiddleware.authMiddleware, loanSimulationController.saveLoanSimulation);

module.exports = router;