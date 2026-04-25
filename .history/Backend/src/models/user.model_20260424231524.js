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
            type : String , 
            enum : ['B.Tech' , 'M.Tech' , 'PhD' , 'Other'] ,
            required : true
        },
        targetDest :{
            type : String,
            enum : ['India', 'England' , 'USA' , 'Germany' , 'Other'] ,
            required : true
        },
        annualBudget :{
            type : Number , 
            required : true,
            min : 0
        }
    },
    password :{
        type : String ,
        required : true,
        unique : true
    }
}, {timestamps : true}) ;

const user 