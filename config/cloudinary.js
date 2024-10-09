<<<<<<< HEAD
//used tio connect with cloudinary because  images videos etc etc is stored in cloudinary
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"

dotenv.config({});

cloudinary.config( {
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET

})

=======
//used tio connect with cloudinary because  images videos etc etc is stored in cloudinary
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"

dotenv.config({});

cloudinary.config( {
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET

})

>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
export default cloudinary;