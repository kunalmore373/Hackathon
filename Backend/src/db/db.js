require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : 'mongodb://localhost:27017/hackathon';
        console.log('🔄 Attempting to connect to MongoDB...');
        
        await mongoose.connect(mongoURI);
        
        console.log('✅ Connected to MongoDB Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        if (err.reason) console.error('Reason:', err.reason);
        throw err; // Re-throw to allow server.js to handle it
    }
}

module.exports = connectDB;