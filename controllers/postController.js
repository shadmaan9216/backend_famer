import express from "express"
import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc create post
// @route POST /api/post/create
export const createPost = asyncHandler(async (req, res) => {
    const { title, description, image, farmerId } = req.body;
    const post = await Post.create({
        title,
        description,
        image,
        farmer: farmerId
    });
    await post.save();
    res.status(202).json(post);
});

// @desc get Posts by id
// @route get /api/post/
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ farmer: req.body.farmerId });
    res.status(200).json(posts);
});