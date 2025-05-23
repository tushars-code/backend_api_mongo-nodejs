import clientPromise from "../db.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  if (req.method === "GET") {
    const jobs = await collection.find({}).toArray();
    res.status(200).json(jobs);
  } else if (req.method === "POST") {
    const { name, job, jd } = req.body;
    const result = await collection.insertOne({ name, job, jd });
    res.status(201).json(result);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
