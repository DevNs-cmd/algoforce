import { MongoClient } from "mongodb";
const uri = process.env.MONGO_URI;

let db;
let client;

export const connectDB = async () => {
  if (!uri) {
    console.error("❌ MONGO_URI is missing from environment variables!");
    console.log("Please set MONGO_URI in your Render Environment Variables.");
    process.exit(1);
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("algoforce");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("❌ Database not initialized");
  }
  return db;
};

export const closeDB = async () => {
  await client.close();
};
