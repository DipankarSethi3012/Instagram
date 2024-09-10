<<<<<<< HEAD
import express from "express";
// import cloudinary from "../config/cloudinary.js";
import { editProfile, getProfile, login, register, logout, getSuggesstions, followOrUnfollow} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggesstions);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);


export default router;



=======
import express from "express";
import { editProfile, getProfile, login, register, logout, getSuggesstions, followOrUnfollow} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggesstions);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;



>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
