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
    console.log('Register Request Body:', req.body);
    if (require('mongoose').connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database connection not established. Please try again in a moment.' });
    }
    try {
        let { email, password, profile, fullName } = req.body;
        profile = profile || {};
        
        // Map fullName to profile.name if provided
        if (fullName && !profile.name) {
            profile.name = fullName;
        }

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

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const newUser = new User({
            email,
            password: hashedPassword,
            profile,
            otp,
            otpExpires
        });

        await newUser.save();

        // In a real app, send OTP via email here
        console.log(`OTP for ${email}: ${otp}`);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        return res.cookie('token', token, cookieOptions).status(201).json({
            message: 'User registered successfully. Please verify your email.',
            otp, // Returning OTP for development/testing purposes
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

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email to log in' });
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

async function verifyOTP(req, res) {
    try {
        const { otp } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        await user.save();

        console.log(`Reset OTP for ${email}: ${otp}`);
        res.json({ message: 'OTP sent to email', otp }); // Returning OTP for dev
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function resetPassword(req, res) {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register: registerUser,
    login: login,
    verifyOTP: verifyOTP,
    forgotPassword,
    resetPassword
};
