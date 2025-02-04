import User from "../models/user.js";
import Posts from "../models/posts.js";

export const getPosts = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await User.findOne({ username }).populate("posts");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getLikedPosts = async (req,res) =>{
    try{
        if(req.user.username == req.params.username){
            res.status(200).json(req.user.likedPosts)
        }
        else{
            res.status(404).json({error:"can only find your own liked posts"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getDisLikedPosts = async (req,res) =>{
    try{
        if(req.user.username == req.params.username){
            res.status(200).json(req.user.disLikedPosts)
        }
        else{
            res.status(404).json({error:"can only find your own liked posts"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}
