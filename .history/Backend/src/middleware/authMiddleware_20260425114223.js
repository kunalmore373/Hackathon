const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

await function authMiddleware ( req , res , next ) {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 

    if (!token ){
        return res.status(401).json({ message: 'No token provided' });
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET || 'secret');
        const userId = async user.findById 
        if ( !userId )
        next();
    }catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    };
}