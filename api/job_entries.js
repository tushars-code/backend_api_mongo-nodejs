const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;
async function connectDB() {
  if (!client) {
    client = await MongoClient.connect(process.env.MONGO_URI);
  }
  return client.db(); // returns jobAppDB
}
