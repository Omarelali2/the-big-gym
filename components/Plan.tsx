"use client"

import { useUser } from "@clerk/nextjs"
import SearchBar from "./SearchBar"

export default function search() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return null
  return <SearchBar />
}
