import mongoose from "mongoose";

const DB = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    if (!DB) throw new Error("DB_URL is not defined");
    await mongoose.connect(DB);

    console.log("MongoDB Connected Sucessfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;