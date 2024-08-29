import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});
const dbConnect = async (req, res) =>{
    const dbUrl = process.env.DATABASE_URL;

    if(!dbUrl) {
        console.log("Database urlm not found");
        process.exit(1);
    }
    try{

        await mongoose.connect(dbUrl, ({}));
        console.log("Database connection successful");


    } catch (err) {
        console.log("An error has been occured while connecting the database");
        console.error(err.message);
        process.exit(1);
    }
}

export default dbConnect;