import express from "express";
import { registerFarmer, authUser, connectFarmer, getFarmerById } from "../controllers/farmerController.js";
const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", authUser);
router.post("/connection", connectFarmer);
router.get("/:id", getFarmerById)

export default router;
