import EducatedPost from "../models/educatedPost";

export const getPosts = async (req,res)=>{
    try{
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"server error"});
    }
} 