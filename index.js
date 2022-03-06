import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import farmerRoutes from "./routes/farmerRoutes.js"
import postRoutes from './routes/postRoutes.js';

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/api/doctor", doctorRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})