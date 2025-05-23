import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is called to load `.env` locally

const uri = process.env.MONGO_URI;
const options = {};

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
