import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "Not logged in", redirect: "/api/login" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ error: "Not logged in", redirect: "/api/login" });
        }

        const user = await User.findOne({ _id: decode.userId }).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found", redirect: "/api/login" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
