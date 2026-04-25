const express = require('express');
const app = express();
const connectDB = require('./src/db/db');
const authRoutes = require('./src/routes/auth.routes');
const cookieParser = require('cookie-parser');

// Connect to database
connectDB();

const app = require ('./src/app') ;