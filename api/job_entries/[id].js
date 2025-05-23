// backend/api/job_entries/[id].js
import clientPromise from "../../db.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");
  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Deleted", result });
    } else if (req.method === "PUT") {
      const { name, job, jd } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, job, jd } }
      );
      res.status(200).json({ message: "Updated", result });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
