import express from "express";
import clientPromise from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all user profiles
router.get("/", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("user_profiles");
    const profiles = await collection.find().toArray();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// GET a single user profile by ID
router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("user_profiles");
    const profile = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// POST new user profile
router.post("/", async (req, res) => {
  try {
    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("user_profiles");
    const result = await collection.insertOne(req.body);
    res.status(201).json({ message: "Profile added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add profile" });
  }
});

// PUT update user profile
router.put("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("user_profiles");
    const { name, bio, college, course, imageUrl } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, bio, college, course, imageUrl } }
    );

    res.status(200).json({ message: "Profile updated", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// DELETE user profile
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const client = await clientPromise;
    const collection = client.db("jobAppDB").collection("user_profiles");
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ message: "Profile deleted", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

export default router;
