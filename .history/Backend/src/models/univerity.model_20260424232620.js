const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    repuirements: {
        gpa: {
            type: Number,
            min: 0,
            max: 10
        },
        degree: {
            type: String,
            enum: ['B.Tech', 'M.Tech', 'PhD', 'Bachelors', 'Masters', 'Other']
        },
        major: {
            type: String    
        }
    },
    applicationProcess: {