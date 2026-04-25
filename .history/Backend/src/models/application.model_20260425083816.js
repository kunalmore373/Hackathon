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
        enum: ['pending', 'accepted', 'rejected','Loan Approved','Loan Rejected','Dis'],
        default: 'pending'
    }
});
