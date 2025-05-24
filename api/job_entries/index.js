import express from "express";
import clientPromise from "../../db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const jobs = await db.collection("jobs").find().toArray();
  res.json(jobs);
});

router.post("/", async (req, res) => {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const job = req.body;
  await db.collection("jobs").insertOne(job);
  res.json({ message: "Job added" });
});

export default router;
