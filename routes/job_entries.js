import express from "express";
import clientPromise from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("jobs");
    const jobs = await collection.find().toArray();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// POST new job
router.post("/", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("jobs");
    const result = await collection.insertOne(req.body);
    res.status(201).json({ message: "Job added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add job" });
  }
});

// PUT update job
router.put("/:id", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("jobs");
    const { id } = req.params;
    const { name, job, jd } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, job, jd } }
    );

    res.status(200).json({ message: "Job updated", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("jobs");
    const { id } = req.params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Job deleted", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
