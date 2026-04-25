const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
    }
