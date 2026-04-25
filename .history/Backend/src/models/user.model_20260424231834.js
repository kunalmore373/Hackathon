const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        name: {
            type: String,
            required: true
        },
        currentDegree: {
            type: String,
            enum: ['B.Tech', 'M.Tech', 'PhD', 'Bachelors', 'Masters', 'Other'],
            required: true
        },
        academicStanding: {
            gpa: {
                type: Number,
                min: 0,
                max: 10
            },
            university: {
                type: String
            },
            major: {
                type: String
            }
        },
        targetDestinations: [{
            type: String,
            enum: ['UK', 'USA', 'Canada', 'Germany', 'Australia', 'Other']
        }],
        testScores: {
            gre: {
                verbal: Number,
                quantitative: Number,
                analyticalWriting: Number,
                total: Number
            },
            ielts: {
                overall: Number,
                listening: Number,
                reading: Number,
                writing: Number,
                speaking: Number
            },
            toefl: {
                total: Number
            }
        },
        annualBudget: {
            type: Number,
            required: true,
            min: 0
        }
    },
    applicationJourney: {
        phase: {
            type: String,
            enum: ['Discovery', 'Shortlisted', 'Applying', 'Loan Approved'],
            default: 'Discovery'
        },
        shortlistedUniversities: [{
            name: String,
            country: String,
            status: String // e.g., 'Applied', 'Accepted', etc.
        }],
        loanApplications: [{
            amount: Number,
            status: String, // e.g., 'Applied', 'Approved', 'Rejected'
            emiSimulation: Number
        }]
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;