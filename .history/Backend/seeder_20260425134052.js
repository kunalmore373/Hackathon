// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./src/models/university.model'); // Adjust path if needed
const universities = require('./data/univeristy');
const connectDB = require('./src/db/db');

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