const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : true ,
        unique : true
    },
    profile :{
        name :{
            type : String ,
            required : true
        },
        currentDeg :{
            
        }
    }
})