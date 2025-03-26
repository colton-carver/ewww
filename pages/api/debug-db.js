import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  try {
    console.log("Testing MongoDB connection...")
    const client = await clientPromise
    console.log("Connected to MongoDB client")

    const db = client.db("aliceingreekland")
    console.log("Accessed aliceingreekland database")

    // Try to insert a test document
    const testResult = await db.collection("test").insertOne({
      test: true,
      timestamp: new Date(),
    })
    console.log("Test document inserted:", testResult)

    // Try to read donations
    const donations = await db.collection("donations").find({}).toArray()
    console.log(`Found ${donations.length} donations`)

    res.status(200).json({
      connected: true,
      testInserted: testResult.acknowledged,
      donationsCount: donations.length,
      donations: donations,
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    res.status(500).json({
      connected: false,
      error: error.message,
      stack: error.stack,
    })
  }
}

