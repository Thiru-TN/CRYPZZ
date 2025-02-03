import mongoose from "mongoose";

const allowedPosts = ["general", "prediction"];

const posts = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    postType: {
      type: String,
      required: true,
      enum: allowedPosts,
    },
    replies: [
      {
        text: { type: String, required: true },
        author: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        likes: { type: Number, default: 0 },  
        dislikes: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", posts);

export default Posts;
