"use client"

import { useUser } from "@clerk/nextjs"
import Footer from "@/components/Footer"

export default function ConditionalFooter() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return null
  return <Footer />
}
