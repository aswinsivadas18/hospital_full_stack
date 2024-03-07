const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('./Mongoose/Mongo');
const { initGridFS } = require('./Schema/Gridfs');
const router = require('./Router/Router');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Initialize GridFS after MongoDB connection is established
mongoose.connection.once('open', () => {
  initGridFS();
  
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
});

// Use router
app.use(router);
