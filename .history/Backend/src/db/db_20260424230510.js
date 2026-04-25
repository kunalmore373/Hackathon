const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongoose://localhost:27017/,hackathon ').then (()=>{
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

}

