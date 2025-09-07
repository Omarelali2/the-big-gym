"use client"

import { useUser } from "@clerk/nextjs"
import SearchBar from "./SearchBar"

export default function Search() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return null

  return <SearchBar />
}
