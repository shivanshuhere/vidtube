import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("db Connection Successfully \n");
  } catch (error) {
    console.log("db connection failed :: ", error);
    process.exit(1);
  }
};

export { connectDB };
