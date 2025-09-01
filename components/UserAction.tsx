"use client"

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"

const UserActions = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}

export default UserActions
