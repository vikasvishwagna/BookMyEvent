import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import eventRoutes from "./routes/eventRoutes.js";
import path from "path";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);


export default app;
