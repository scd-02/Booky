const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connnected: ${database.connection.host}`);
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;
