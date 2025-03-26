import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { buffer } from "micro"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return res.status(500).json({ error: "Stripe keys are not configured" })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
    const sig = req.headers["stripe-signature"] as string
    let event

    try {
      const buf = await buffer(req)
      const bodyString = buf.toString()
      console.log("Webhook received, processing...")

      event = stripe.webhooks.constructEvent(bodyString, sig, process.env.STRIPE_WEBHOOK_SECRET)
      console.log("Webhook verified, event type:", event.type)
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`)
      return res.status(400).json({ error: `Webhook Error: ${err.message}` })
    }

    // Handle the event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment succeeded:", paymentIntent.id)
      // You can log this to your console or send an email notification
    }

    res.status(200).json({ received: true })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

