import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/algoforce"

  try {
    const db = await mongoose.connect(uri, {
      autoIndex: true,
    })

    isConnected = db.connections[0].readyState === 1
    console.log(`✅ MongoDB Connected: ${db.connection.host}`)
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    // Fallback logic for development if needed, but Mongoose is required for the new models
    process.exit(1)
  }
}

export const getDB = () => {
  return mongoose.connection.db
}

export const closeDB = async () => {
  await mongoose.disconnect()
}
