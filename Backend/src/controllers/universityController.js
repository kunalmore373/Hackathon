const fs = require('fs');
const path = require('path');

// Load universities data from JSON file
let universitiesData = [];
try {
    const filePath = path.join(__dirname, '..', '..', 'world_universities_and_domains.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    universitiesData = JSON.parse(rawData);
    console.log(`Loaded ${universitiesData.length} universities from JSON file.`);
} catch (error) {
    console.error('Error loading universities JSON:', error.message);
}

// @desc    Fetch all universities (with optional country and search filter)
// @route   GET /api/universities
// @access  Private
const getUniversities = async (req, res) => {
    try {
        const { country, search } = req.query;
        let results = universitiesData;

        // Filter by country if provided (can be multiple countries comma-separated)
        if (country) {
            const countries = country.split(',').map(c => c.trim().toLowerCase());
            results = results.filter(uni => 
                countries.includes(uni.country.toLowerCase())
            );
        }

        // Filter by search query if provided
        if (search) {
            const query = search.toLowerCase();
            results = results.filter(uni => 
                uni.name.toLowerCase().includes(query) || 
                (uni.domains && uni.domains.some(d => d.toLowerCase().includes(query)))
            );
        }

        // Limit results for performance (e.g., top 200)
        res.json(results.slice(0, 200));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Fetch single university (search by name since JSON doesn't have IDs)
// @route   GET /api/universities/:name
// @access  Private
const getUniversityById = async (req , res ) => {
    try {
        const name = decodeURIComponent(req.params.id); // Reusing 'id' param as name/identifier
        const university = universitiesData.find(uni => uni.name === name);
        
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getUniversities,
    getUniversityById
};