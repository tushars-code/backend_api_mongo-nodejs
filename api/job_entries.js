import clientPromise from "../../backend/api/db";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("jobAppDB");

    if (req.method === "GET") {
      const jobs = await db.collection("jobs").find({}).toArray();
      res.status(200).json(jobs);
    } else if (req.method === "POST") {
      const { name, job, jd } = req.body;
      const result = await db.collection("jobs").insertOne({ name, job, jd });
      res.status(201).json(result);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
