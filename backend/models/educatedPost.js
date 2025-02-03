import mongoose from "mongoose";

const educatedPost = new mongoose.Schema({
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
    coin:{
        type:String,
        required:true
    },
    replies: [{
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        timestamp: { type: Date, default: Date.now }
    }]
},{timestamps:true})

const Prediction = mongoose.model("Prediction",educatedPost);

export default Prediction;
