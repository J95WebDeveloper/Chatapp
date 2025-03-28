import mongoose from "mongoose";
import {MONGO_URL}  from "./config.js";

export const connectDB = async() => {
  try {
     await mongoose.connect(MONGO_URL);
     console.log("DataBase is Connected...");
  } catch (error) {
    console.log("Failed to connectDB....");
    console.log(error);
  }
}
