// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./src/'); // Adjust path if needed
const universities = require('./data/universities');
const connectDB = require('./db/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await University.deleteMany(); // Clear existing
        await University.insertMany(universities); // Insert new
        
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();