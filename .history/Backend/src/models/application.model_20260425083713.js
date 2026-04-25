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
