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

export const Post = mongoose.model('Post', postSchema);