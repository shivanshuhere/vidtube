import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import ErrorResponse from "./ErrorResponse.js";

dotenv.config({
  path: "src/.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary. File  src: ", response.url);
    //after upload is done, del from  server
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("cloudinary eroor :: ", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async function (id) {
  try {
    const response = await cloudinary.uploader.destroy(id);
    console.log("Deleted assets successfully.", response);
    return response;
  } catch (error) {
    return new ErrorResponse(400, "Failed to delete assets. public id :", id);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
