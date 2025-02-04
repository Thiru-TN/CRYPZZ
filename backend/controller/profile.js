import User from "../models/user.js";
import Posts from "../models/posts.js";

export const getPosts = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await User.findOne({ username }).populate({
            path: "posts",
            model: "Posts",
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getStats = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).populate("posts");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const response = {
            username: user.username,
            followers: user.followers,
            following: user.following.length,
            posts: user.posts.length
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getLikedPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username })
            .populate('likedPosts')  
            .exec();

        if (user) {
            res.status(200).json(user.likedPosts);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getDisLikedPosts = async (req,res) =>{
    try {
        const { username } = req.params;

        const user = await User.findOne({ username })
            .populate('disLikedPosts')  
            .exec();

        if (user) {
            res.status(200).json(user.disLikedPosts);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}


export const follow = async (req, res) => {
    try {
        const { tofollow } = req.params;
        const userId = req.user?._id;

        const toUser = await User.findOne({ username: tofollow });
        if (!toUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.username === tofollow) {
            return res.status(404).json({ error: "Can't follow yourself" });
        }

        // Ensure user.following is always an array
        if (!Array.isArray(user.following)) {
            user.following = [];
        }

        if (user.following.includes(toUser._id)) {
            return res.status(400).json({ error: "Already following this user" });
        }

        toUser.followers += 1;
        await toUser.save();

        user.following.push(toUser.username);
        await user.save();

        res.status(200).json({ message: "Followed successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
