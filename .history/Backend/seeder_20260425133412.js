// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./models/University'); // Adjust path if needed
const universities = require('./data/universities');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => console.log(err));

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