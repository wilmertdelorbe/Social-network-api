const mongoose = require('mongoose');

// Establish connection to MongoDB
// Using a unique database name for our social media API project
mongoose.connect('mongodb://127.0.0.1:27017/social_media_network_db');

// Export the database connection
// This allows other parts of the application to access the database
const dbConnection = mongoose.connection;
module.exports = dbConnection;