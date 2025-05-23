// /backend/api/job_entries.js
import clientPromise from "../../db.js"; // fixed relative path

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  try {
    if (req.method === "GET") {
      const jobs = await collection.find().toArray();
      res.status(200).json(jobs);
    } else if (req.method === "POST") {
      const newJob = req.body;
      await collection.insertOne(newJob);
      res.status(200).json({ message: "Job added" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
