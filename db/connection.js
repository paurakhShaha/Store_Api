const mongoose = require('mongoose');

// Connect to the database

const connectDB = (uri) =>{
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  }

module.exports = connectDB;
