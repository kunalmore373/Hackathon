const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function registerUser (req , res ) {
    const { email , password , profile } = req.body;

    const existingUser = User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        profile
    });

    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
}