// backend/api/job_entries/[id].js
import clientPromise from "../../db.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");
  const { id } = req.query;

  try {
    let query;

    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { _id: id };
    }

    if (req.method === "DELETE") {
      const result = await collection.deleteOne(query);
      res.status(200).json({ message: "Deleted", result });
    } else if (req.method === "PUT") {
      const { name, job, jd } = req.body;
      const result = await collection.updateOne(query, {
        $set: { name, job, jd },
      });
      res.status(200).json({ message: "Updated", result });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
