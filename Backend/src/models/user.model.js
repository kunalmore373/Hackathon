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
        annualBudget: {
            type: Number,
            required: true,
            min: 0
        }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;