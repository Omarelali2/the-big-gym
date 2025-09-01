import { currentUser } from "@clerk/nextjs/server"
import { createUserAction } from "@/actions/createUser"
import Container from "./Container"
import Logo from "./Logo"
import HeaderMenu from "./HeaderMenu"
import { UserButton } from "@clerk/nextjs"
import SignIn from "./SignIn"
import Menu from "./Menu"
import SearchBar from "./SearchBar"
import Link from "next/link"

const HeaderServer = async () => {
  const clerkUser = await currentUser()

  let isAdmin = false

  if (clerkUser) {
    const user = await createUserAction({
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
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
          <SearchBar />
          {clerkUser ? (
            <UserButton />
          ) : (
            <>
              <Link
                href='/coach/login'
                className='px-3 py-1 rounded-md bg-orange-600 text-white duration-700 hover:bg-red-700 transition'
              >
                Coach Login
              </Link>
              <SignIn />
            </>
          )}
\          {isAdmin && (
            <Link
              href={"/dashboard"}
              className='px-3 py-1 rounded-md bg-red-600 text-white duration-700 hover:bg-orange-700 transition'
            >
              Dashboard
            </Link>
          )}
          <Menu />
        </div>
      </Container>
    </header>
  )
}

export default HeaderServer
