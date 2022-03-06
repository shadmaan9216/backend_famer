import asyncHandler from "express-async-handler"
import Doctor from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// @desc Create new user
// @route POST /api/users
// @access Public
export const getAlluser = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
});

// @desc get user by id
// @route GET /api/users/:id
// @access Public

export const getUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await Doctor.findById(id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(401).send("Invalid user");
    }
});


export const registerUser = asyncHandler(async (req, res) => {
    const { name, age, password, experience, specialization, email, phone, availability, image } = req.body;
    const userExists = await Doctor.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Doctor.create({
        name,
        email,
        age,
        availability,
        experience,
        image,
        specialization: specialization.split(", "),
        password: hashedPassword,
        phoneNumber: phone,
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
            age: newUser.age,
            reviews: newUser.reviews,
            rating: newUser.rating,
            image: newUser.image,
            availability: newUser.availability,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Doctor.findOne({ email });
    if (!user) {
        res.status(400).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, "1234", {
        expiresIn: "30d",
    });
    if (user) {
        res.status(200);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age,
            reviews: user.reviews,
            rating: user.rating,
            image: user.image,
            availability: user.availability,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
