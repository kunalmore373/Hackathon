const mongoose = require('mongoose');

function connectDB() {
    const uri = "mongodb://localhost:27017/mern-hackathon";
    mongoose.connect( uri ).then (()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.error('Error connecting to MongoDB', err);
    }
}