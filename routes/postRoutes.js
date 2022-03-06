import express from "express";
const router = express.Router();
import { getPosts, createPost } from "../controllers/postController.js";

router.post("/create", createPost);
router.get("/", getPosts);

export default router;