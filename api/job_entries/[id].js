import express from "express";
import clientPromise from "../../db.js";
import { ObjectId } from "mongodb";
const router = express.Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const client = await clientPromise;
  const db = client.db("jobAppDB");

  const result = await db.collection("jobs").deleteOne({
    _id: ObjectId.isValid(id) ? new ObjectId(id) : id
  });

  res.json({ message: "Deleted", result });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, job, jd } = req.body;
  const client = await clientPromise;
  const db = client.db("jobAppDB");

  const result = await db.collection("jobs").updateOne(
    { _id: ObjectId.isValid(id) ? new ObjectId(id) : id },
    { $set: { name, job, jd } }
  );

  res.json({ message: "Updated", result });
});

export default router;
