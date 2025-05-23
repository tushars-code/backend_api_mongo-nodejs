import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
