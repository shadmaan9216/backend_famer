import express from "express";
import {
    getUserProfile,
    registerUser,
    loginUser,
    getAlluser
} from "../controllers/doctorController.js";
const router = express.Router();

router.get("/:id", getUserProfile);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAlluser)
export default router;
