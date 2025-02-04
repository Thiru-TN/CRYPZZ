import express from "express";
import { getPosts,getLikedPosts, getDisLikedPosts } from "../controller/profile.js";
const router  = express.Router();


router.get("/posts/:username", getPosts);
router.get("/posts/:username/liked", getLikedPosts);
router.get("/posts/:username/disliked", getDisLikedPosts);


export default router;