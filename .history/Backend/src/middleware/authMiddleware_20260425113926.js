const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

function authMiddleware ( req , res , next ) {
    const token = req.cookies.token 
}