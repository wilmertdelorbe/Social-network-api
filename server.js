const express = require('express');
const dbConnection = require('./config/db-config');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api', routes);
console.log('Routes mounted');

// Catch-all route for any requests to an unknown endpoint
app.use('*', (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// Connect to the database before starting the Express server
dbConnection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Idea Network API server running on port ${PORT}!`);
  });
});

// Error handler for database connection
dbConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});