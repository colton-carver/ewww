import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("aliceingreekland")

    // Get all donations
    const donations = await db.collection("donations").find({}).toArray()

    // Return connection status and data
    res.status(200).json({
      success: true,
      message: "MongoDB connected successfully",
      donationCount: donations.length,
      donations: donations,
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to connect to MongoDB",
      error: error.message,
    })
  }
}

