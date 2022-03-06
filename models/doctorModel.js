import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
    {
        name: { type: String },
        rating: { type: Number },
        comment: { type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Farmer"
        },
    },
    {
        timestamps: true,
    }
);

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    specialization: {
        type: Array,
    },
    image: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [reviewSchema],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connected: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
            required: true,
        },
    ]
},
    {
        timestamps: true,
    });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;