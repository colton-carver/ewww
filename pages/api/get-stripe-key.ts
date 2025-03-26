import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  publishableKey: string | undefined
  error?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    // Return the publishable key
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      return res.status(500).json({
        publishableKey: undefined,
        error: "Stripe publishable key is not configured",
      })
    }

    res.status(200).json({
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

