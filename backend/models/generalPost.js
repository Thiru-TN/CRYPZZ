import mongoose from "mongoose";

const generalPost = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    likes:{
        type:Number,
        default: 0
    },
    dislikes:{
        type:Number,
        default: 0
    },
    replies: [{
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        timestamp: { type: Date, default: Date.now }
    }]
},{timestamps:true})

const GeneralPost = mongoose.model("GeneralPost",generalPost);

export default GeneralPost;
