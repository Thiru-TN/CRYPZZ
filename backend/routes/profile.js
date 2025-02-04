import express from "express";
import { getPosts,getLikedPosts, getDisLikedPosts, getStats,follow } from "../controller/profile.js";
import protectRoute from "../middleware/protectRoute.js";
const router  = express.Router();


router.get("/posts/:username", getPosts);
router.get("/stats/:username",getStats);
router.get("/posts/:username/liked", getLikedPosts);
router.get("/posts/:username/disliked", getDisLikedPosts);
router.get("/follow/:tofollow",protectRoute,follow);


export default router;