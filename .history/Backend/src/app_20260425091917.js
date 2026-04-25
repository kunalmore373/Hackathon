const express = require('express');
const app = express();
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth.routes');

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Auth routes
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;