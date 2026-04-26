const universityModel = require('../models/university.model');

const getUniversities = async (req, res) => {
    try {
        const filter = req.query.country ? { country: req.query.country } : {};
        const universities = await universityModel.find(filter);
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Fetch single university
// @route   GET /api/universities/:id
// @access  Private
const getUniversityById = async (req , res ) => {
    try {
        const university = universityModel.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}