import ConditionalFooter from "@/components/ConditionalFooter"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "../../components/Header"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <div className='relative w-full'>
        <div className='absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60 -z-10'></div>
        <div className='absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60 -z-10'></div>

        <Header />
        {children}
        <ConditionalFooter />
      </div>
    </ClerkProvider>
  )
}
