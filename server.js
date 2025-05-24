import express from "express";
import dotenv from "dotenv";
import jobRoutes from "./api/job_entries/index.js";
import jobDetailRoutes from "./api/job_entries/[id].js";

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/job_entries", jobRoutes);
app.use("/api/job_entries/:id", jobDetailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
