import { currentUser } from "@clerk/nextjs/server"
import { SignOutButton } from "@clerk/nextjs"
import { createUserAction } from "@/actions/createUser"
import Container from "./Container"
import Logo from "./Logo"
import HeaderMenu from "./HeaderMenu"
import SignIn from "./SignIn"
import Menu from "./Menu"
import Link from "next/link"
import { User, LayoutDashboard, LogOut } from "lucide-react"
import Plan from "./Plan"
import Image from "next/image"
const HeaderServer = async () => {
  const clerkUser = await currentUser()

  let isAdmin = false

  if (clerkUser) {
    const user = await createUserAction({
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username ?? "",
      imageUrl: clerkUser.imageUrl,
    })

    isAdmin = user.isAdmin
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md'>
      <Container className='flex items-center justify-between'>
        <div className='w-auto pl-5 md:w-1/3 flex items-center gap-2.5 justify-start md:gap-5'>
          <Logo />
        </div>

        <HeaderMenu />

        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <Plan />
          {clerkUser ? (
            <div className='relative group'>
              <button className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300'>
                {" "}
                <Image
                  width={48}
                  height={48}
                  src={clerkUser.imageUrl}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />{" "}
              </button>

              <div className='absolute right-0 top-9 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-200 hidden group-hover:block z-50 overflow-hidden'>
                <Link
                  href='/clients/profile'
                  className='flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium'
                >
                  <User className='w-4 h-4' />
                  Profile
                </Link>

                {isAdmin && (
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
            </div>
          ) : (
            <>
              <Link
                href='/coach/login'
                className='px-3 h-10 py-2 rounded-md bg-orange-600 text-white duration-700 hover:bg-red-700 transition'
              >
                Coach Login
              </Link>
              <SignIn />
            </>
          )}

          <Menu />
        </div>
      </Container>
    </header>
  )
}

export default HeaderServer
