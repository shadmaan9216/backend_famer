import asyncHandler from "express-async-handler"
import Doctor from "../models/doctorModel.js"
import Post from "../models/postModel.js";
import Farmer from "../models/farmerModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// @desc Create new user
// @route POST /api/users
// @access Public
export const getAlluser = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json({ "data": doctors });
});

// @desc get user by id
// @route GET /api/users/:id
// @access Public

export const getUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await Doctor.findById(id).populate("connected");
    if (user) {
        return res.json(user);
    } else {
        return res.status(401).send("Invalid user");
    }
});


export const registerUser = asyncHandler(async (req, res) => {
    const { name, age, password, experience, email, phone, image } = req.body;
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
        //availability, // need to remove 
        experience,
        image,
        //specialization: specialization.split(", "), // need to remove
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
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Doctor.findOne({ email }).populate("connected");
    const farmers = user.connected;
    const farmerPosts = user.posts;
    // const posts = await Post.findById(farmerId).populate("");
    const posts = [];
    // console.log(user);
    for (let f in farmers) {
        const post = await Post.find({ farmer: (farmers[f]._id.toString()) });
        // for (let p in post) {

        //     const a = await Farmer.findById(post[p].farmer.toString());
        //     console.log(a);
        // }
        posts.push(post);
    }

    // console.log(posts);
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
            user,
            posts,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
