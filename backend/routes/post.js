import express from "express";
import {getPosts,putPosts,follow,addDislikes,addLikes,replyToPost} from "../controller/post.js";
const router  = express.Router();


router.post("/",putPosts)
router.post("/follow",follow)
router.post("/liked",addLikes)
router.post("/disliked",addDislikes)
router.get("/",getPosts)
router.post("/post/reply",replyToPost)  

export default router;