import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = mongoose.connect("mongodb+srv://Shadmaan:Shadman1920@cluster0.gqbd7.mongodb.net/doctorDB?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
