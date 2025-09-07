"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import { toggleUserSubscription } from "@/lib/data"

type Props = {
  userId: string
  initialActive: boolean
}

export default function SubscriptionToggle({ userId, initialActive }: Props) {
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    const res = await toggleUserSubscription(userId)
    setLoading(false)
    if (res.success) {
      setActive(res.subscriptionActive ?? active)
      toast.success(
        `Subscription is now ${res.subscriptionActive ? "Active" : "Inactive"}`
      )
    } else {
      toast.error(`Error: ${res.error}`)
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleToggle}
      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
        active ? "bg-green-500 text-white" : "bg-red-400 text-white"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {active ? "Active" : "Inactive"}
    </button>
  )
}
