// backend/api/job_entries/index.js
import clientPromise from "../../db.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  if (req.method === "GET") {
    const jobs = await collection.find().toArray();
    res.status(200).json(jobs);
  } else if (req.method === "POST") {
    const job = req.body;
    await collection.insertOne(job);
    res.status(200).json({ message: "Job added" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
