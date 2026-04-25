const express = require('express');
const app = express();
const connectDB = require('./db/db');

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/user'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;