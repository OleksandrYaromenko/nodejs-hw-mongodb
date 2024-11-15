import cloudinary from "cloudinary";
import dotenv from "dotenv";

 dotenv.config();


cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
})
export function uploadToCloudinary(filePath) {
   return cloudinary.v2.uploader.upload(filePath)
}