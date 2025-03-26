import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
  // Check if the user is authenticated
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("aliceingreekland")

    // Log connection success
    console.log("Connected to MongoDB successfully")

    // Fetch donations from the database
    const donations = await db.collection("donations").find({}).sort({ timestamp: -1 }).toArray()

    // Log the number of donations found
    console.log(`Found ${donations.length} donations in the database`)

    // Return the donations
    return res.status(200).json({ donations })
  } catch (error) {
    // Log the error
    console.error("Error fetching donations:", error)

    // Return the error
    return res.status(500).json({
      error: "Failed to fetch donations",
      details: error.message,
      stack: error.stack,
    })
  }
}

