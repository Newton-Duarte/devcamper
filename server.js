const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
// Body parser
app.use(express.json());
// Load env vars
dotenv.config({ path: './config/config.env'});
// Route files
const bootcamps = require('./routes/bootcamps');
// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

// Connect to database
connectDB();

// Dev logging moddleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(logger);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});