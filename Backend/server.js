require('dotenv').config();
const connectDB = require('./src/db/db');
const app = require('./src/app');

// Start server only after DB connection
const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Database connection failed. Server not started.');
        // Don't exit process in development to allow nodemon to watch and restart
    }
};

startServer();

module.exports = app;