import express from "express";
import { login , logout } from "../controller/auth.js";
import protectRoute from "../middleware/protectRoute.js";
const router  = express.Router();


router.post("/login",login)
router.post("/logout",logout)

router.get("/verify", protectRoute, (req, res) => {
    res.status(200).json({ 
      isAuthenticated: true,
      user: {
        username: req.user.username,
        // Include other non-sensitive user information if needed
      }
    });
  });
export default router;