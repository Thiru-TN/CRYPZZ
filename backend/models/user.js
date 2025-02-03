import mongoose from "mongoose";
const typeOfRisks = ["high","low","medium"];
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required: true
    },
    budget:{
        type:Number,
        required:true
    },
    risk:{
        type:String,
        required:true,
        enum:typeOfRisks
    },
    holdtime:{
        type:Number, //days
        required:true
    },
    coins:{
        type:[String]
    },
    posts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Posts"
    },
    followers:{
        type:Number,
        default:0
    },
    following:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Users"
    },
    likedPosts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Posts"
    },
    disLikedPosts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Posts"
    },
    crypzzRatting:{
        type: Number,
        default : 0
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;


// budget , risk , country , holdTime