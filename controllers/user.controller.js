// import { models } from "mongoose";
import pkg from 'mongoose';
const { models } = pkg;

import {
    User
} from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";

//controller for sign-up the user
export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        if (!username || !email || !password) {
            console.log("details missing while creating the user please fill details carefully");
            return res.status(401).json({
                //status 401 means unauthorized
                success: false,
                message: "Something is missing, please fill details carefully"
            })
        }

        const user = await User.findOne({
            email
        });

        if (user) {
            console.log("User already exists .. Please Login")
            return res.status(401).json({
                message: "User already exisits unable to sign up",
                success: false
            });
        }
        //hash function is used to hash the password 10 is number of salt rounds higher the number of salt rounds more complesx the hash password is  optimally number is 10 so we are using it
        const hashPassword = await bcrypt.hash(password, 10); //we are hashing the password for making it secure
        //await because we are intreacting with
        await User.create({
            username,
            email,
            password: hashPassword
        });

        console.log("User created successfully");
        //status 201 means CReated -: req has been fulfilled and lead to creating of new resourse
        return res.status(201).json({
            success: true,
            message: "user createde successfully"
        });

    } catch (err) {
        console.log("AN error has been occured while registering the user");
        console.error(err.message);
        //status 500 means there was unexpected error on server
        res.status(500).json({
            success: false,
            error: err.message,
            message: "An error occured whilw creating the user"
        })
    }
}
//contoller for login the user
export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            console.log("Details missing while logging the user , Please fill the details carefully");
            //401 means unauthorized 
            res.status(401).json({
                success: false,
                message: "Details missing while logging the user"
            });
        }
        //using let because in future we may have to change the user
        let user = await User.findOne({
            email
        });

        if (!user) {
            console.log("User not found , Incorrect email");
            return res.status(401).json({
                success: false,
                message: "Incorrect email , Enter details carefully"
            })
        }
        //comapre password is uswd to compare our hash passowrd with the user entered password
        const isPaswordMatch = await bcrypt.compare(password, user.password);

        if (!isPaswordMatch) {
            console.log("Password not match, Enter carefully");
            //status 401 means unauthorized
            return res.status(401).json({
                success: false,
                message: "Password is wrong"
            })
        }

        // and storing the details of user
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts
        }
        //generating token : -it tells us user authenticated or not
        //token is stored in cookies 
        //while token remains in cookies user remains login
        //while token expires user logouts

        //Sign method is used to generate a json webtoken 
        //it takes secret key and an expirtaion time
        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });
        //secret key is cruical component is creating and verifying json web tokens
        //secretv key always kept confidiential if someone gets access to your secret key, they could poteentially create valid tokens and compromise system security
        console.log("token generate successfully");

        res.cookie('token', token, {
            httpOnly: true,
            sameSize: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: `Welcome back ${user.username}`,
            user
        })

        console.log("cookie generate successfully");
        console.log(user);
        console.log(`User Login successfull, Welcome back ${user.username}`);
    } catch (err) {
        console.log("An error has been occured while logging in the user");
        console.error(err.message);
        //status 500 means internal server error
        res.status(500).json({
            succes: false,
            error: err.message,
            message: "Unable to log-in the user"
        })
    }
}

//controller for logout of user
export const logout = async (req, res) => {
    try {
        //we have to delete the token present in cookie
        //we make the token empty empty represtnts false and maxAge to 0 means expires now
        return res.cookie("token", "", {
            maxAge: 0
        }).json({
            succes: true,
            message: "User logOut successfully"
        });
    } catch (err) {
        console.log("An error has been occured while log-out the user");
        console.error(err.message);

        res.status(500).json({
            succes: false,
            error: err.message,
            message: "Unable to log out the user"
        })
    }
}

//controller to get profile of user

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        let user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("User profile fetched successfully");
        console.log(user);

        return res.status(200).json({
            user,
            success: true
        });

    } catch (err) {
        console.log("An error occurred while fetching the user's profile");
        console.error(err.message);

        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Can't get profile of user"
        });
    }
};

//controller to edit profile of user

export const editProfile = async (req, res) => {
    try {
        //we have stored user id in req while authenticating the user
        const userId = req.id;
        const {
            bio,
            gender
        } = req.body;
        const profilePicture = req.file; //fetching profilePicture
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri); //uploading file to cloudinary
        }

        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found for updating the post");

            return res.status(404).json({ //status 404 means :- not found
                success: false,
                message: "User not found"
            })
        }
        if (bio) {
            user.bio = bio;
        }

        if (gender) {
            user.gender = gender;
        }

        if (profilePicture) {
            user.profilePicture = cloudResponse.secure_url; //secure_url contains the link of our image
        }

        await user.save(); //saving the update user

        console.log("User has been updated successfully");

        res.status(200).json({
            success: true,
            message: "Us4r profile updated",
            user
        })
    } catch (err) {
        console.log("An error while Updating the profile of user");
        console.error(err.message);

        res.status(500).json({
            succes: false,
            message: "unable to update the profile of user"
        })
    }
}

//contoller for suggestions : suggested users

export const getSuggesstions = async (req, res) => {
    try {
        const suggestedUsers = await User.find({
            _id: {
                $ne: req.id
            }
        }).select("password"); //gives users that has id not equal to request id without password

        if (!suggestedUsers) {
            console.log("unable to find suggessted users");

            return res.status(400).json({
                success: false,
                message: "Don't have users, So can't find suggessted users"
            })
        }

        console.log("Successfully find suggessted users");

        return res.status(200).json({
            succes: true,
            message: "Find suggessted Users",
            suggestedUsers
        })
    } catch (err) {
        console.log("AN eror has occured in suggessted users");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error: err.message,
            message: "An error occured while finding suggessted users"
        })
    }
}

//controller for follow anmd unfollow

export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // i am logged in so i can fetch my id directly //dipankar
        const jiskoFollowKroonga = req.params.id; //mukul

        if (followKrneWala === jiskoFollowKroonga) {
            console.log("You can't follow and unfollow youself");
            return res.status(400).json({ //400 means bad request
                success: false,
                message: "You can't follow/unfollow yourself"
            })
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKroonga);

        if (!user || !targetUser) {
            console.log("User not found foe follow/unfolllow");

            return res.status(400).json({
                success: false,
                message: "User not found for follow / unfollow"
            })
        }

        //We have to check for we have to  follow or unfollow

        const isFollowing = user.following.includes(jiskoFollowKroonga); //includes method checks whether the id of the person which we have to follow is already present in following array or not
        console.log(isFollowing);
        if (isFollowing) {
            //writing unfollow logic
            console.log("you have alreay following that person , now  unfollowing it");
            await Promise.all([
                User.updateOne(  //mukul ko unfollow kr rha hoon
                    {_id:followKrneWala} ,{$pull:{following:jiskoFollowKroonga}}
      
                ),
                User.updateOne(
                    {_id: jiskoFollowKroonga}, {$pull:{followers : followKrneWala}}
                )
            ])

            console.log("User unfollowed successfully");
            res.status(200).json( {
                message :'Unfollow Successfully',
                succes : true
            });
        } else {
            //writing follow logic
            console.log("You haven't followed that person , now following it");
            //we are handing both user and target user so that's why we use promise.all()
            await Promise.all([
                User.updateOne({
                    _id: followKrneWala
                }, {
                    $push: {
                        following: jiskoFollowKroonga
                    }
                }),
                User.updateOne({
                    _id: jiskoFollowKroonga
                }, {
                    $push: {
                        followers: followKrneWala
                    }
                }),
            ])

            console.log("User followed successfully");
            res.status(200).json({
                success : true,
                message :"User followed successfully"
            })
        }

    } catch (err) {
        console.log("An error has occured while following/unfollowing the user");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error: err.message,
            message: "Can't follow/unfollow user"
        })
    }
}