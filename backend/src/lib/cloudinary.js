import {v2 as cloudinary} from 'cloudinary';
import { config } from "dotenv";

config();

//import dotenv from 'dotenv'; //this is used to get the environment variables from the .env file
//dotenv.config(); //this is used to get the environment variables from the .env file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const deleteFromCloudinary = async (publicUrl) => {
    try {
        if (!publicUrl) return null;
        
        // Extract public_id from the URL
        // URL format: https://res.cloudinary.com/CLOUD_NAME/image/upload/v1234567890/public_id.jpg
        const urlParts = publicUrl.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        
        // Delete the file from cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.log("Error deleting file from cloudinary:", error);
        return null;
    }
}

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file
        return response;
    } catch (error) {
        console.log("Error uploading file to cloudinary:", error);
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation failed
        return null
    }   
}

export default cloudinary;
export { uploadOnCloudinary, deleteFromCloudinary };