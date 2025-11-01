const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/devTinder", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Local MongoDB connected successfully!");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
  }
};

connectDB();

module.exports = connectDB;
