const User = require('../models/user.model');

// @desc    Update user profile (Onboarding 'Blueprint')
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Update the profile fields based on the incoming request body
            user.profile.currentDegree = req.body.currentDegree || user.profile.currentDegree;
            user.profile.targetDestinations = req.body.targetDestinations || user.profile.targetDestinations;
            user.profile.annualBudget = req.body.annualBudget || user.profile.annualBudget;
            
            // Handle academic standing updates if provided
            if (req.body.academicStanding) {
                user.profile.academicStanding = {
                    ...user.profile.academicStanding,
                    ...req.body.academicStanding
                };
            }

            const updatedUser = await user.save();
            updatedUser.message = 'User profile updated successfully';

            res.json({
                _id: updatedUser._id,
                email: updatedUser.email,
                profile: updatedUser.profile
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get current user data (For dashboard initialization)
// @route   GET /api/users/me
// @access  Private
// const getUserProfile = async (req, res) => {
//     // // req.user is populated by our auth middleware
//     // res.json(req.user); 

    
// };

const getUserProfile = async (req, res) => {
    console.log("--- Controller Hit ---");
    console.log("req.user is:", req.user); // Is it undefined?
    
    // Ensure you are actually returning res.json()
    if (!req.user) {
        return res.status(404).json({ message: "User object is missing" });
    }
    
    res.json(req.user); 
};

module.exports = { updateUserProfile, getUserProfile };