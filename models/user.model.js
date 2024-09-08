<<<<<<< HEAD
import mongoose, { mongo, Mongoose } from "mongoose";

const userSchema = new mongoose.Schema( {
    username : {
        type : String,
        required : true,
        unique : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type: String,
        default : '',
    },
    bio : {
        type : String,
        default : '',
        maxLen : 400
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'others' , 'Male' , 'Female', 'Others'],
    },
    followers : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } ],
    following : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],

    posts : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    bookmarks : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
}, {timeStamps : true}); //timestamps is used to record the time of user when user is created

=======
import mongoose, { mongo, Mongoose } from "mongoose";

const userSchema = new mongoose.Schema( {
    username : {
        type : String,
        required : true,
        unique : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type: String,
        default : '',
    },
    bio : {
        type : String,
        default : '',
        maxLen : 400
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'others'],
    },
    followers : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } ],
    following : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],

    posts : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    bookmarks : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
}, {timeStamps : true}); //timestamps is used to record the time of user when user is created

>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
export const User = mongoose.model('User', userSchema);