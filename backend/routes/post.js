import express from "express";
import {getPosts,putPosts,follow,addDislikes,addLikes,replyToPost,addReplyLikes,addReplyDislikes,getFollowedUsers} from "../controller/post.js";
const router  = express.Router();


router.post("/",putPosts)
router.post("/follow",follow)
router.post("/liked",addLikes)
router.post("/disliked",addDislikes)
router.get("/",getPosts)
router.post("/post/reply",replyToPost)
router.post("/reply/liked",addReplyLikes)
router.post("/reply/disliked",addReplyDislikes)
router.get("/followedUsers",getFollowedUsers)  

export default router;