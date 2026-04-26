const universityModel = require('../models/university.model');

async function getUniversities (req , res) => {
    try{
        const filter = req.query.country ? { country: req.query.country } : {};
        const universities = await universityModel.find(filter);
        res.json(universities);
    }
}