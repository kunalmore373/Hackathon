const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Secure cookie options
const cookieOptions = {
    httpOnly : true ,
    secure : process.env.NODE_ENV === 'production' ,
    sameSite : 'strict' ,
    maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
} ;

function registerUser(req, res) {
    try {
        const { email, password, profile } = req.body;

        const existingUser = User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            profile
        });

        const token = jwt.sign({ userId: newUser._id }, 'secret', { expiresIn: '1h' });
        newUser.save()
        res.cookies('token', token, { httpOnly: true }).json({
            message: 'User registered successfully',
            user: {
                userId: newUser._id,
                email: newUser.email,
                profile: newUser.profile
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    
}

function login(req , res ) {
    try {
        const { email , password } = req.body ;
        const user = User.findOne({ email }) ;
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.cookie('token', token, cookieOptions).json({
            message: 'Login successful',
            user: {
                userId: user._id,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    register: registerUser,
    login: login
}
