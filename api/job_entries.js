// /backend/api/job_entries.js
import clientPromise from "../db.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("jobAppDB");
  const collection = db.collection("jobs");

  switch (req.method) {
    case "GET":
      const jobs = await collection.find().toArray();
      res.status(200).json(jobs);
      break;

    case "POST":
      const newJob = req.body;
      await collection.insertOne(newJob);
      res.status(200).json({ message: "Job added" });
      break;

    case "PUT":
      const { _id, ...updateFields } = req.body;
      await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updateFields });
      res.status(200).json({ message: "Job updated" });
      break;

    case "DELETE":
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Job deleted" });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
