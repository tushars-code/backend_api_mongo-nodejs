// /backend/api/job_entries/[id].js
import clientPromise from "../../../db.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Job deleted successfully" });
      } else {
        res.status(404).json({ message: "Job not found" });
      }
    } else if (req.method === "PUT") {
      const { name, job, jd } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, job, jd } }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Job updated successfully" });
      } else {
        res.status(404).json({ message: "Job not found or data unchanged" });
      }
    } else {
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
