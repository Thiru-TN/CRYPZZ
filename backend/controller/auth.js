import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import gentoken from "../utils/jwt.js"  

export const login = async (req,res)=>{
    try{
        const type = req.body.input;
        if(type=="signup"){
          const {username , email, password , country,budget,risk,holdtime } = req.body;

          const user = await User.findOne({username});
  
          if(user){
              return res.status(400).json({error:"user already exists"});
          }
  
          const salt = await bcryptjs.genSalt(10);
          const hashed = await bcryptjs.hash(password,salt);
  
          const newuser = await User.create({
              username,
              email:email,
              password : hashed,
              country:country,
              budget:budget,
              risk:risk,
              holdtime:holdtime
          })
          gentoken(newuser._id,res);
          res.status(200).json({
              username: newuser.username
          })
        }
        else{
          const { username, password } = req.body;
  
          const user = await User.findOne({ username });
      
          if (user) {
            const iscorrect = await bcryptjs.compare(password, user.password);
      
            if (iscorrect) {
              gentoken(user._id, res);
              res.status(200).json({
                username: user.username,
              });
            } else {
              res.status(400).json({ error: "Invalid password" });
            }
          } else {
            res.status(400).json({ error: "User not found" });
          }
        }
        
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({error:"server error"});
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout successfull"})
    } 
    catch (error) {
        console.error("logout error:", error);
        res.status(500).json({ error: "Server error" });
    }
}