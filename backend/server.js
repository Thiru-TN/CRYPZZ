import express, { json } from "express";
import dotnev from "dotenv";
import connect from "./database/dbConfig.js";
import auth from "./routes/login.js";
import feed from "./routes/post.js";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/protectRoute.js";
import cors from "cors";

//config
dotnev.config();
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const PORT = process.env.PORT

app.use("/api/feed",protectRoute,feed);
app.use("/api/auth",auth);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    connect();
})