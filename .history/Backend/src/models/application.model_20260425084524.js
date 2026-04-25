const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    universityId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    programName:  {
        type: String,
    },
    status: {
        type: String,
        enum: ['Discovery', 
            'Shortlisted', 
            'Applying', 
            'Accepted', 
            'Rejected', 
            'Loan Pending', 
            'Loan Approved', 
            'Loan Rejected'],
        default: 'Discovery'
    }
}, { timestamps: true });
const applicationModel = mongoose.model('Application', applicationSchema);