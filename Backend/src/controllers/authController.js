const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secure cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

async function registerUser(req, res) {
    try {
        let { email, password, profile } = req.body;
        profile = profile || {};

        // Accept top-level targetDestinations and annualBudget and merge into profile
        if (req.body.targetDestinations && !profile.targetDestinations) {
            profile.targetDestinations = Array.isArray(req.body.targetDestinations)
                ? req.body.targetDestinations
                : [req.body.targetDestinations];
        }
        if (req.body.annualBudget != null && profile.annualBudget == null) {
            profile.annualBudget = req.body.annualBudget;
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            profile
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        return res.cookie('token', token, cookieOptions).status(201).json({
            message: 'User registered successfully',
            user: {
                userId: newUser._id,
                email: newUser.email,
                profile: newUser.profile
            }
        });
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        return res.cookie('token', token, cookieOptions).json({
            message: 'Login successful',
            user: {
                userId: user._id,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register: registerUser,
    login: login
};
