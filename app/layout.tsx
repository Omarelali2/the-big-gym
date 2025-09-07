import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Gym Leb",
  icons: {
    icon: "/logo.webp",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60"></div>
          <div className="absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60"></div>

          <div className="flex min-h-screen relative z-10">
            <main className="flex-1 p-6 overflow-y-auto">
              <Toaster position="top-right" reverseOrder={false} />
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
