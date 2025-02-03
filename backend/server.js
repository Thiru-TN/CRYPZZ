import express from "express";
import dotnev from "dotenv";
import connect from "./database/dbConfig.js";
import auth from "./routes/login.js";

//config
const app = express();
app.use(express.json()); 
dotnev.config();
const PORT = process.env.PORT


app.use("/api/auth",auth);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    connect();
})