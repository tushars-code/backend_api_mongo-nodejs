import clientPromise from "../db.js";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(); // defaults to DB in your connection string
  const collection = db.collection('jobs');

  if (req.method === 'GET') {
    const jobs = await collection.find().toArray();
    res.status(200).json(jobs);
  }

  else if (req.method === 'POST') {
    const body = req.body;
    if (!body.name || !body.job || !body.jd) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const result = await collection.insertOne(body);
    res.status(200).json(result);
  }

  else if (req.method === 'PUT') {
    const id = req.query.id;
    const body = req.body;
    if (!id || !body.name || !body.job || !body.jd) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const { ObjectId } = await import('mongodb');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: body.name, job: body.job, jd: body.jd } }
    );
    res.status(200).json(result);
  }

  else if (req.method === 'DELETE') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing ID' });

    const { ObjectId } = await import('mongodb');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  }

  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}