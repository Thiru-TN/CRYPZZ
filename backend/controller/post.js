import Posts from "../models/posts.js";
import User from "../models/user.js"

export const getPosts = async (req, res) => {
    try {
        const followingList = req.user.following;
        let resResult;
        if (followingList?.length<3) {
            resResult = await Posts.find().sort({ likes: -1 }).limit(5).lean();
        }
        else{
            resResult = await Posts.find({ author: { $in: followingList } })
                .sort({ createdAt: -1 })
                .lean();
        }
        res.status(200).json(resResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getFollowedUsers = async (req, res) => {
    try {
        const followingList = req.user.following;
        res.status(200).json(followingList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const putPosts = async (req, res) => {
    try {
        const { text, postType } = req.body;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!text || !postType) {
            return res.status(400).json({ error: "Text and postType are required" });
        }

        // Create new post
        const newPost = new Posts({
            text,
            author: req.user.username,
            postType,
        });

        const savedPost = await newPost.save(); 

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { posts: savedPost._id } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const follow = async (req, res) => {
    try {
        const { tofollow } = req.body;
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

        user.following.push(toUser.username);  // Use _id to avoid potential issues
        await user.save();

        res.status(200).json({ message: "Followed successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};



export const addLikes = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { postid } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const post = await Posts.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if(user.disLikedPosts.includes(postid)){
            post.dislies-=1;
            await post.save();
            user.disLikedPosts = user.disLikedPosts.filter(post => !post.equals(postid));
            await user.save();
        }
        if (user.likedPosts.includes(postid)) {
            post.likes -= 1;
            await post.save();

            user.likedPosts = user.likedPosts.filter(post => !post.equals(postid));
            await user.save();

            return res.status(200).json({ message: "Post unliked successfully", post });
        } else {
            post.likes += 1;
            await post.save();

            user.likedPosts.push(postid);
            await user.save();

            return res.status(200).json({ message: "Post liked successfully", post });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const addDislikes = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { postid } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const post = await Posts.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if(user.likedPosts.includes(postid)){
            post.likes-=1;
            await post.save();
            user.likedPosts = user.likedPosts.filter(post => !post.equals(postid));
            await user.save();
        }
        if (user.disLikedPosts.includes(postid)) {
            post.dislikes -= 1;
            await post.save();

            user.disLikedPosts = user.disLikedPosts.filter(post => !post.equals(postid));
            await user.save();

            return res.status(200).json({ message: "Post un-disliked successfully", post });
        } else {
            post.dislikes += 1;
            await post.save();

            user.disLikedPosts.push(postid);
            await user.save();

            return res.status(200).json({ message: "Post disliked successfully", post });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const replyToPost = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { postid, text } = req.body;

        const post = await Posts.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const reply = {
            text,
            author: req.user.username,
            timestamp: new Date(),
            likes: 0, 
            dislikes: 0, 
        };
        
        post.replies.push(reply);
        await post.save();

        res.status(200).json({ message: "Reply added successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const addReplyDislikes = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { postid, replyIndex } = req.body;
        
        // Fetch the post
        const post = await Posts.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.replies || post.replies.length <= replyIndex) {
            return res.status(400).json({ error: "Invalid reply index" });
        }

        post.replies[replyIndex].dislikes += 1;

        await post.save();

        res.status(200).json({ message: "Reply disliked successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const addReplyLikes = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { postid, replyIndex } = req.body;
        
        // Fetch the post
        const post = await Posts.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.replies[replyIndex].likes += 1;

        await post.save();

        res.status(200).json({ message: "Reply liked successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};