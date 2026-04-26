const loanSimulation = require('../models/loanSimulation.model');

// @desc    Save or update a loan simulation (Upsert)
// @route   POST /api/loans/simulate
// @access  Private
const saveLoanSimulation = async (req, res) => {
    try {
        const { universityId, loanAmount, tenureYears, moratoriumMonths } = req.body;

        // Check if a simulation already exists for this user and university
        let simulation = await loanSimulation.findOne({ userId: req.user._id, universityId });
        if (simulation) {
            // Update existing simulation
            simulation.loanAmount = loanAmount;
            simulation.tenureYears = tenureYears;
            simulation.moratoriumMonths = moratoriumMonths;
            if (universityId) simulation.universityId = universityId;

            const updatedSimulation = await simulation.save();
            res.status(200).json({ message: 'Loan simulation updated successfully', simulation: updatedSimulation });
        } else {
            // Create new simulation
            const newSimulation = await loanSimulation.create({
                userId: req.user._id,
                universityId: ,
                loanAmount,
                tenureYears,
                moratoriumMonths
            });
            res.status(201).json({ message: 'Loan simulation saved successfully', simulation: newSimulation });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving loan simulation', error });
    }
}

// @desc    Get user's current loan simulation
// @route   GET /api/loans/simulate
// @access  Private
const getLoanSimulation = async (req, res) => {
    try {
        const simulation = await loanSimulation.findOne({ userId: req.user._id }).populate('universityId', 'name country imageUrl');    
        if (!simulation) {
            return res.status(404).json({ message: 'No loan simulation found for this user' });
        }
        res.status(200).json({ simulation });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loan simulation', error });
    }
}

module.exports = {
    saveLoanSimulation,
    getLoanSimulation
}