import express from "express"
import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Doctor from "../models/doctorModel.js";

// @desc create post
// @route POST /api/post/create
export const createPost = asyncHandler(async (req, res) => {
    const { title, description, image, farmerId, doctorId } = req.body;
    //const doctor = await Doctor.findOneAndUpdate({ _id: req.body.doctorId }, { $push: {connected: req.body.farmerId } }, { new: true }).populate("connected", "name email phone");

    const doctor = await Doctor.findOne({ _id: req.body.doctorId });

    if (!doctor.connected.includes(req.body.farmerId)) {
        const doctor2 = await Doctor.updateOne({ _id: req.body.doctorId }, { $push: { connected: req.body.farmerId } }).populate("connected", "name email phone");
    }

    //console.log("D", doctor);

    if (!doctor) {
        return res.send("NULL occured");
    }
    await doctor.save();
    const post = await Post.create({
        title,
        description,
        image,
        farmer: farmerId,
        doctor: doctorId
    });
    await post.save();
    res.status(202).json(post);
})

// @desc get Posts by id
// @route get /api/post/
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ farmer: req.body.farmerId });
    res.status(200).json(posts);
});