import express from "express"
import Farmer from "../models/farmerModel.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/doctorModel.js"

//@desc register farmer
//@route POST /api/farmer/register
//@access public
export const registerFarmer = asyncHandler(async (req, res) => {
    const { name, email, password, city, state, phone } = req.body;
    const farmerExists = await Farmer.findOne({ email });
    if (farmerExists) {
        res.status(400).send("Farmer already exists");
        throw new Error("Farmer already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Farmer.create({
        name,
        email,
        password: hashedPassword,
        city,
        state,
        phone
    });
    const token = jwt.sign({ id: newUser._id }, "1234", {
        expiresIn: "30d",
    });
    if (newUser) {
        res.status(201);
        res.json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc login farmer and generating token
//@route POST /api/farmer/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
        return res.status(401).send("Invalid email or password");
    }
    let verifiedPassword = await bcrypt.compare(password, farmer.password);
    if (!verifiedPassword) {
        return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ id: farmer._id }, "1234", {
        expiresIn: "30d",
    });

    res.status(201).json({
        farmer,
        token,
    });
});

// @desc get farmer profile
// @route GET /api/farmer/:id
// @access public
export const getFarmerById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const farmer = await Farmer.findById(id);
    if (!farmer) {
        return res.status(400).send("Farmer not found");
    }
    res.json(farmer);
})

// @desc connection with farmer
// @route POST /api/farmer/connection
// @access public
export const connectFarmer = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOneAndUpdate({ _id: req.body.doctorId }, { $push: { connected: req.body.farmerId } }, { new: true }).populate("connected", "name email phone");
    //console.log("D", doctor);
    if (!doctor) {
        return res.send("NULL occured");
    }
    await doctor.save();
    res.json(doctor);
})

// @desc get farmer posts by id
// @route GET /api/farmer/:id
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Farmer.findById(req.body.farmerId).populate("posts");
    res.json(posts);
});
