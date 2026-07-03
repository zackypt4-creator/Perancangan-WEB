import express from "express";
import allRoutes from "./routes/api.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", allRoutes);

export default app;
