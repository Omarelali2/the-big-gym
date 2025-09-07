"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UserPlus,
  List,
  Dumbbell,
  Layers,
  CreditCard,
  Home,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const Sidebar = () => {
  const pathname = usePathname()
  const [listOpen, setListOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-red-600 p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-4 overflow-auto shadow-xl transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-red-500 tracking-wide">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-1 flex-1">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/add-exercises"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/add-exercises"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <Dumbbell size={20} />
            <span>Add Exercise</span>
          </Link>

          <Link
            href="/dashboard/add-coach"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/add-coach"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <UserPlus size={20} />
            <span>Add Coach</span>
          </Link>

          <Link
            href="/dashboard/add-subscribe"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/add-subscribe"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <CreditCard size={20} />
            <span>Add Package</span>
          </Link>

          <Link
            href="/dashboard/add-worktype"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/add-worktype"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <Layers size={20} />
            <span>Add Work Out</span>
          </Link>

          <Link
            href="/dashboard/add-exmuscule"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/add-exmuscule"
                ? "bg-red-600 border-l-4 border-orange-400 font-semibold shadow-inner"
                : "hover:bg-gray-700 hover:text-white hover:translate-x-1"
            }`}
          >
            <Layers size={20} />
            <span>Add Muscle Type</span>
          </Link>

          <button
            onClick={() => setListOpen(!listOpen)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <List size={20} />
              <span>List</span>
            </div>
            <span className={`transform transition-transform ${listOpen ? "rotate-90" : ""}`}>
              ▶
            </span>
          </button>

          {listOpen && (
            <div className="flex flex-col ml-6 mt-1 gap-1">
              <Link
                href="/dashboard/list-coach"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard/list-coach"
                    ? "bg-red-600 font-semibold shadow-inner"
                    : "hover:bg-gray-700"
                }`}
              >
                Coaches
              </Link>
              <Link
                href="/dashboard/list-muscle"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard/list-muscle"
                    ? "bg-red-600 font-semibold shadow-inner"
                    : "hover:bg-gray-700"
                }`}
              >
                Muscles
              </Link>
              <Link
                href="/dashboard/list-exercises"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard/list-exercises"
                    ? "bg-red-600 font-semibold shadow-inner"
                    : "hover:bg-gray-700"
                }`}
              >
                Exercises
              </Link>
              <Link
                href="/dashboard/list-workout"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard/list-workout"
                    ? "bg-red-600 font-semibold shadow-inner"
                    : "hover:bg-gray-700"
                }`}
              >
                Workout Types
              </Link>
              <Link
                href="/dashboard/list-sub"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard/list-sub"
                    ? "bg-red-600 font-semibold shadow-inner"
                    : "hover:bg-gray-700"
                }`}
              >
                Subscriptions
              </Link>
            </div>
          )}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <Link
            href={"/clients"}
            className="flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-red-700 text-white hover:bg-orange-700 transition-all duration-200"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
