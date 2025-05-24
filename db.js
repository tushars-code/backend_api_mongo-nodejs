import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI not set");

const client = new MongoClient(uri);
const clientPromise = client.connect();
export default clientPromise;
