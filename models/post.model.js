<<<<<<< HEAD
import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema( {
    caption : {
        type : String,
        default : ''
    },
  
    image :  {
        type : String,
        required : true
    },
    author : { //which user has created a post
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true,
    },

    likes : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    comments : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})

=======
import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema( {
    caption : {
        type : String,
        default : ''
    },
  
    image :  {
        type : String,
        required : true
    },
    author : { //which user has created a post
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true,
    },

    likes : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    comments : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})

>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
export const Post = mongoose.model('Post', postSchema);