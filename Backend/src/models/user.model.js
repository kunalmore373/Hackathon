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
        avatar: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        currentDegree: {
            type: String,
            enum: ['B.Tech', 'M.Tech', 'PhD', 'Bachelors', 'Masters', 'Other'],
            required: false
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
            required: false,
            min: 0
        }
    },
    password: {
        type: String,
        required: false // Optional for Google OAuth users
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;