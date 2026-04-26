const Application = require ( '../models/application.model') ;
const University = require ('../models/university.model') ;

// @desc    Create a new application (Shortlist a university)
// @route   POST /api/applications
// @access  Private
const createApplication = async (req , res) => {
    try{
        const { universityId , programName } = req.body ;
        // Check if the university exists
        const university = await University.findById(universityId ) ;
        if ( !university ) {
            return res.status(404).json({ message : 'University not found' }) ;
        }

        const existingApp = await Application.findOne ({})
    }
}
