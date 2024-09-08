import { text } from "express";
import mongoose, { mongo } from "mongoose";
const commentSchema = new mongoose.Schema ( {
    text : {
        type : String,
        required : true,
    },
    //the comment is published by whom
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    //on which post comment has been done
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
});

export default  commentSchema = mongoose.model('Comment', commentSchema);