"use client"

import { useUser } from "@clerk/nextjs"
import SearchBar from "./SearchBar"
import { useState } from "react"
import Logo from "./Logo"
import Logo1 from "./Logo2"

export default function Search() {
  const { isSignedIn } = useUser()
  const [hideLogo, setHideLogo] = useState(false)

  if (!isSignedIn) return null

  return (
    <div className="flex items-center gap-4">
      {!hideLogo && <Logo1/>}
      <SearchBar
        onExpand={() => setHideLogo(true)}
        onCollapse={() => setHideLogo(false)}
      />
    </div>
  )
}
