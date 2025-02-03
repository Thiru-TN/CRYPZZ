import posts from "../models/posts.js";

export const getPosts = async (req, res) => {
    try {
        const followingList = req.user.following;
        let resResult;
        if (!followingList?.length) {
            resResult = await posts.find().sort({ likes: -1 }).limit(5).lean();
        }
        else{
            resResult = await posts.find({ author: { $in: followingList } })
                .sort({ createdAt: -1 })
                .lean();
        }
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
