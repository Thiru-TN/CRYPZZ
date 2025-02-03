import mongoose from "mongoose";

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
        type:Number,
        required:true
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
        ref: "educatedPost"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;


// budget , risk , country , holdTime