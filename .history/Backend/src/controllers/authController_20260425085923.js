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

    
}