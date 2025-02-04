import express from "express";
import dotnev from "dotenv";
import connect from "./database/dbConfig.js";
import auth from "./routes/login.js";
import feed from "./routes/post.js";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/protectRoute.js";
import cors from "cors";
import profile from "./routes/profile.js";

//config
dotnev.config();
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const PORT = process.env.PORT

//routes
app.use("/api/auth",auth);
app.use("/api/feed",protectRoute,feed);
app.use("/api/profile",profile);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    connect();
})