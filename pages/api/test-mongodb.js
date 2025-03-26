import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("aliceingreekland")

    // Create a test document
    const testDonation = {
      paymentIntentId: "test_" + Date.now(),
      donorName: "Test Donor",
      donorEmail: "test@example.com",
      amount: "10.00",
      memberCredited: "Test Member",
      memberSlug: "test-member",
      status: "completed",
      timestamp: new Date().toISOString(),
    }

    // Insert the test document
    const result = await db.collection("donations").insertOne(testDonation)

    // Return success response
    res.status(200).json({
      success: true,
      message: "Test document inserted successfully",
      insertedId: result.insertedId,
      testDonation,
    })
  } catch (error) {
    console.error("MongoDB test error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to insert test document",
      error: error.message,
    })
  }
}

