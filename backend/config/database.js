import { MongoClient } from "mongodb";
let db;
let client;

export const connectDB = async () => {
  // Check for both MONGODB_URI and MONGO_URI for compatibility
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is missing from environment variables!");
    console.log("Setting up default MongoDB connection string for local development...");
    // Provide a default for local development if neither is set
    const defaultUri = "mongodb://localhost:27017/algoforce";
    console.log(`Using default URI: ${defaultUri}`);
    try {
      const { MongoClient } = await import("mongodb");
      const defaultClient = new MongoClient(defaultUri);
      await defaultClient.connect();
      db = defaultClient.db("algoforce");
      console.log("✅ MongoDB Connected (Local Development)");
      client = defaultClient;
      return;
    } catch (error) {
      console.error("❌ Failed to connect to default MongoDB:", error.message);
      console.log("Please install MongoDB locally or set MONGODB_URI in your environment variables.");
      process.exit(1);
    }
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
