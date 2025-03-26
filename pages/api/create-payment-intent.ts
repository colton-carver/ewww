import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

type RequestData = {
  amount: string
  donorName: string
  donorEmail: string
  memberCredited: string
  memberSlug: string
}

type ResponseData = {
  clientSecret?: string
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: "Stripe secret key is not configured" })
      }

      console.log("Creating payment intent with Stripe...")
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      })

      const { amount, donorName, donorEmail, memberCredited, memberSlug } = req.body as RequestData

      console.log("Payment details:", { amount, donorName, memberCredited })

      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number.parseFloat(amount) * 100), // Convert to cents
        currency: "usd",
        metadata: {
          donorName,
          donorEmail,
          memberCredited,
          memberSlug,
        },
        receipt_email: donorEmail,
        description: `Donation to Alice in Greekland - Credited to ${memberCredited}`,
      })

      console.log("Payment intent created:", paymentIntent.id)
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error("Error creating payment intent:", error)
      res.status(500).json({ error: "Failed to process payment" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

