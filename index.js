import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import dbConnect from './config/db.js';
import userRoute from './routes/user.route.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions)); 

//api's
app.use("/api/v2/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server listening at Port ${PORT}`);
    dbConnect();
});

app.get("/", (req, res) => {
    res.send("<h1>Home page of SnapStar</h1>");
});
