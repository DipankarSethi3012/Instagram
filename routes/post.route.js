import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";


import { addNewPost,  getUserPost, getAllPost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/alluserpost").get(isAuthenticated, getUserPost);
router.route("/allposts").get(isAuthenticated, getAllPost);

// upload.single('image') processes the file upload. The uploaded file will be available in req.file with the field name 'image'. This middleware handles the parsing and storage of the file before passing control to the next middleware or route handler.


export default router;