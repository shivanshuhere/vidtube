import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: "deq5uwgur",
  api_key: "937216529642673",
  api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
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
    fs.unlinkSync(localFilePath);
    return null;
  }
};
