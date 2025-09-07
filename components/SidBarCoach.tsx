"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Dumbbell, Home, MessageCircle } from "lucide-react"

const SidebarCoach = () => {
  const pathname = usePathname()

  return (
    <aside className='h-screen w-64 bg-gray-900 text-white flex flex-col p-4 shadow-xl'>
      <h2 className='text-2xl font-bold mb-8 text-center text-red-500 tracking-wide'>
        Coach Panel
      </h2>

      <nav className='flex flex-col gap-1 flex-1'>
        <Link
          href='/coach/dashboard'
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            pathname === "/coach/dashboard"
              ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
              : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href='/coach/dashboard/profile'
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            pathname === "/coach/dashboard/profile"
              ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
              : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
          }`}
        >
          <Dumbbell size={20} />
          <span>My Profile</span>
        </Link>
        <Link
          href='/coach/dashboard/messages'
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            pathname === "/coach/dashboard/messages"
              ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
              : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
          }`}
        >
          <MessageCircle size={20} />
          <span>Messages</span>
        </Link>
      </nav>

      <div className='mt-auto pt-4 border-t border-gray-700'>
        <Link
          href={"/clients"}
          className='flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-red-700 text-white hover:bg-orange-700 transition-all duration-200'
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  )
}

export default SidebarCoach
