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

        const existingApp = await Application.findOne ({
            user : req.user._id ,
            university : universityId ,
        }) ;

        if ( existingApp ) {
            return res.status(400).json({ message : 'You have already shortlisted this university' }) ;
        }

        // Create the new application
        const newApplication = await Application.create({
            user : req.user._id ,
            university : universityId ,
            programName,
            status : 'Shortlisted' 
        });

        await newApplication.save();
        res.status(201).json({ message : 'University shortlisted successfully' , application : newApplication }) ;
    } catch (error) {
        res.status(500).json({ message : 'Error creating application', error });
    }
}


// @desc    Get all applications for the logged-in user (For Dashboard)
// @route   GET /api/applications/me
// @access  Private
const getMyApplications = async ( req , res ) => {
    try{
        const applications = await Application.find
    }
}

