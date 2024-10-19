import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://shivanshu:shivanshuhere@cluster0.lks8o.mongodb.net//vidtube`
    );
    console.log("db Connection Successfully \n", connectionInstance);
  } catch (error) {
    console.log("db connection failed :: ", error);
    process.exit(1);
  }
};

export { connectDB };
