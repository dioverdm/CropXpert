const mongoose = require("mongoose");
// imported mongoose

// async function to connect db to server
// we will import connectDB in server.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected + ${conn.connection.host}`);
    // read more about conn.connection.host
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // error.message give the error in the console
    process.exit(1);
  }
};

module.exports = connectDB;
