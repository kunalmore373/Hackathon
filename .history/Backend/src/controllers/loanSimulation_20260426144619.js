const loanSimulation = require('../models/loanSimulation.model');

// @desc    Save or update a loan simulation (Upsert)
// @route   POST /api/loans/simulate
// @access  Private
const saveLoanSimulation = async (req, res) => {
    try {
        const { universityId, loanAmount, tenureYears, moratoriumMonths } = req.body;

        // Check if a simulation already exists for this user and university
        let simulation = await loanSimulation.findOne({ userId: req.user._id, universityId });
        if (simulation) }{
        // Update existing simulation
        simulation.loanAmount = loanAmount;
        simulation.tenureYears = tenureYears;
        simulation.moratoriumMonths = moratoriumMonths;
        if (universityId ) simulation.universityId = universityId ;

        const updatedSimulation = await simulation.save();
    }
}