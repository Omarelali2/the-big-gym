"use client"

import React from "react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

const AuthButtons = () => {
  return (
    <div className='flex gap-3'>
      <SignInButton mode='modal'>
        <button className='text-sm border-2 border-red-500 font-semibold rounded-md px-3 py-2 hover:text-red-900 duration-500 hover:border-red-500 text-red-500 cursor-pointer'>
          Login
        </button>
      </SignInButton>

      <SignUpButton mode='modal'>
        <button className='text-sm font-semibold bg-red-500 rounded-md text-white hover:bg-red-600 duration-500 hover:text-gray-950 px-3 py-2 cursor-pointer'>
          Sign Up
        </button>
      </SignUpButton>
    </div>
  )
}

export default AuthButtons
