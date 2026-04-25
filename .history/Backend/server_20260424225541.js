const express = require('express');
const connectDB = require ( './src/db/db.js')
const app = require ( './src/app')


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})

