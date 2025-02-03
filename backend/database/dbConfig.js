import mongoose from "mongoose";

const  connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("db connected")
    }
    catch (error){
        console.log(error);
        console.log("cant connect to database");
    }
}

export default connect;