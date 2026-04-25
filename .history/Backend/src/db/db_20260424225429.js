const mongoose = require('mongoose');

function connectDB() {
    const uri = "mongodb://localhost:27017/mern-hackathon";
    mongoose.connect( uri ,)
}