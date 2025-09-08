"use client"

import { useState } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import Container from "./Container"
import Logo from "./Logo"
import HeaderMenu from "./HeaderMenu"
import Menu from "./Menu"
import Plan from "./Plan"
import { User, LayoutDashboard, LogOut } from "lucide-react"

export default function HeaderClient() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [showDropdown, setShowDropdown] = useState(false)

  // Loading state
  if (!isLoaded) return null

  return (
    <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md'>
      <Container className='flex items-center justify-between'>
        <div className='w-auto pl-5 md:w-1/3 flex items-center gap-2.5 justify-start md:gap-5'>
          <Logo />
        </div>

        <HeaderMenu />

        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <Plan />

          {isSignedIn && user ? (
            <div className='relative'>
              <button
                className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300'
                onClick={() => setShowDropdown(prev => !prev)}
              >
                <Image
                  src={user.imageUrl || "/default-profile.png"}
                  alt='Profile'
                  width={48}
                  height={48}
                  className='w-full h-full object-cover'
                />
              </button>

              {showDropdown && (
                <div className='absolute right-0 top-12 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-200 z-50 overflow-hidden'>
                  <Link
                    href='/clients/profile'
                    className='flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium'
                  >
                    <User className='w-4 h-4' />
                    Profile
                  </Link>

                  {(user.publicMetadata as { isAdmin?: boolean })?.isAdmin && (
                    <Link
                      href='/dashboard'
                      className='flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium'
                    >
                      <LayoutDashboard className='w-4 h-4' />
                      Dashboard
                    </Link>
                  )}

                  <SignOutButton>
                    <Link
                      href={"/clients"}
                      className='flex items-center gap-2 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium'
                    >
                      <LogOut className='w-4 h-4' />
                      Sign out
                    </Link>
                  </SignOutButton>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href='/coach/login'
                className='px-3 h-10 py-2 rounded-md bg-orange-600 text-white duration-700 hover:bg-red-700 transition'
              >
                Coach Login
              </Link>
            </>
          )}

          <Menu />
        </div>
      </Container>
    </header>
  )
}
