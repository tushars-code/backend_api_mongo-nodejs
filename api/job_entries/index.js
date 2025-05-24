// backend/api/job_entries/index.js
import clientPromise from "../../db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // respond to preflight
  }

  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  try {
    if (req.method === "GET") {
      const jobs = await collection.find().toArray();
      res.status(200).json(jobs);
    } else if (req.method === "POST") {
      const { name, job, jd } = req.body;
      await collection.insertOne({ name, job, jd });
      res.status(200).json({ message: "Job added" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
