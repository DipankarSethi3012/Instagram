<<<<<<< HEAD
import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema ( {
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    message : {
        type : String,
        required : true,
    }
});

=======
import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema ( {
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    message : {
        type : String,
        required : true,
    }
});

>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
export default messageSchema = mongoose.model('Message' , messageSchema);