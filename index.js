<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import helmet from 'helmet'; // Optional for added security

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Optional for added security
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions)); 

// API Routes
app.use("/api/v2/user", userRoute);
app.use("/api/v2/post", postRoute);

// Home route
app.get("/", (req, res) => {
    res.send("<h1>Home page of SnapStar</h1>");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

// Start server and connect to DB
app.listen(PORT, () => {
    console.log(`Server listening at Port ${PORT}`);
    dbConnect();
});
=======
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
>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
