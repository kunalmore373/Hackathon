const loanSimulationController = require('../controllers/loanSimulation');
const express = require('express');
const router = express.Router();
const authMiddleware} = require('../middleware/authMiddleware');

router.route('/simulate')
    .get(authMiddleware, loanSimulationController.getLoanSimulation)
    .post(authMiddleware, loanSimulationController.saveLoanSimulation);

module.exports = router;