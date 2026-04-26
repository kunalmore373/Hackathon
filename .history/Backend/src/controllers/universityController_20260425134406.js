const universityModel = require('../models/university.model');

const getUniversities = async (req, res) => {
    try {
        const filter = req.query.country ? { country: req.query.country } : {};
        const universities = await universityModel.find(filter);
        res.json(universities);
    }
}