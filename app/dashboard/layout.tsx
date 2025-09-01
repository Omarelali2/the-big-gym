"use client"
import Sidebar from "@/components/SideBar"
import { Toaster } from "react-hot-toast"
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60'></div>
      <div className='absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60'></div>

      <div className='flex  relative z-10'>
        <div className='fixed top-0 left-0 w-64 h-full'>
          <Sidebar />
        </div>

        <main className='flex-1 ml-64 w-full overflow-y-auto'>
          {children}
          <Toaster
            position='top-center'
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: { fontWeight: "bold", borderRadius: "15px" },
            }}
          />
        </main>
      </div>
    </div>
  )
}

export default RootLayout
