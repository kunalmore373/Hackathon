const loanSimulationController = require('../controllers/loanSimulationController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.route('/simulate')
    .get(protect, getSimulation)
    .post(, saveSimulation);

module.exports = router;