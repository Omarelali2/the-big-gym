"use server"

import Stripe from "stripe"
import { db } from "./db"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function createCheckoutSession(
  packageId: number,
  plan: "monthly" | "annually" = "monthly",
  userId?: string
) {
  if (!userId) throw new Error("User ID is required")

  const pkg = await db.package.findUnique({ where: { id: packageId } })
  if (!pkg) throw new Error("Package not found")

  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  if (!frontendUrl) throw new Error("NEXT_PUBLIC_FRONTEND_URL is not defined")

  const basePrice =
    plan === "monthly" ? pkg.monthlyPrice ?? 0 : pkg.annualPrice ?? 0
  if (basePrice <= 0) throw new Error("Invalid price")

  const unitAmount = Math.round(basePrice * 100)

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: pkg.currency.toLowerCase(),
          product_data: { name: `${pkg.name} (${plan})` },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    success_url: `${frontendUrl}/onboarding/health`,
    cancel_url: `${frontendUrl}`,
    client_reference_id: userId,
    metadata: {
      packageId: String(packageId),
      plan,
    },
  })

  console.log(
    `[Stripe] Checkout session created for user ${userId}: ${session.id}`
  )
  return session.url
}

export async function stripeWebhook(req: Request) {
  const sig = req.headers.get("stripe-signature")
  if (!sig) return new Response("Missing Stripe signature", { status: 400 })

  const body = await req.text()
  console.log("[Stripe] Webhook received, raw body length:", body.length)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log("[Stripe] Webhook signature verified")
  } catch (err) {
    console.error("[Stripe] Webhook signature verification failed:", err)
    return new Response(`Webhook Error: ${err}`, { status: 400 })
  }

  console.log("[Stripe] Event type:", event.type)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id
    const packageId = session.metadata?.packageId
    const plan = session.metadata?.plan

    if (!userId) {
      console.warn("[Stripe] No client_reference_id found, cannot update user")
      return NextResponse.json({ received: true })
    }

    try {
      const user = await db.user.findUnique({ where: { clerkUserId: userId } })
      if (!user) {
        console.warn(`[Stripe] User not found in DB with Clerk ID: ${userId}`)
      } else {
        await db.user.update({
          where: { clerkUserId: userId },
          data: {
            subscriptionActive: true,
            selectedPackageId: packageId ? Number(packageId) : null,
          },
        })
        console.log(
          `[Stripe] User ${userId} subscribed to package ${packageId} (${plan})`
        )
      }
    } catch (err) {
      console.error("[Stripe] Error updating user subscription:", err)
    }
  }

  return NextResponse.json({ received: true })
}
