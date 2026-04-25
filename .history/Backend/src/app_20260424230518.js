const express = require('express');
const app = express();
const connectDB = require('./db/db');
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;