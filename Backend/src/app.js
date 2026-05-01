const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const universityRoutes = require('./routes/university.routes');
const applicationRoutes = require('./routes/application.routes');
const loanRoutes = require('./routes/loan.routes');
const passport = require('passport');
const cors = require('cors');
require('./config/passport'); // Ensure passport strategies are configured

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with requests
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/loans/', loanRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;