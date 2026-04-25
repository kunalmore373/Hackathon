const connectDB = require('./src/db/db');
const app = require('./src/app');

// Connect to database
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;