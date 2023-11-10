import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-uri";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// TODO: complete this code

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); //options
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
