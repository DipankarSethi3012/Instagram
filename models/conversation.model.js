<<<<<<< HEAD
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

=======
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
export default Conversation = mongoose.model('Conversation', conversationSchema);