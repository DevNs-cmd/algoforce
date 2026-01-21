import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/algoforce'
const client = new MongoClient(uri)

let db

export const connectDB = async () => {
  try {
    await client.connect()
    db = client.db('algoforce')
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export const getDB = () => db

export const closeDB = async () => {
  await client.close()
}
