// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";



exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log("OPTIONS in uploading to cloudinary", options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
