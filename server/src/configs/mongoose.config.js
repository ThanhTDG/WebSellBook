const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

/**
 * Connect to database
 */
const connectDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
};
