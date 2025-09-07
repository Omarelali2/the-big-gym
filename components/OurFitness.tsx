import ToolsSlider from "./ToolsSlider" // Client Component
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

const OurFitnessServer = async () => {
  const user = await currentUser()
  if (!user) return <AccessDenied message="You need to log in to view our tools." />

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: { selectedPackage: true },
  })

  if (!dbUser) return <AccessDenied message="Your account is not in our database." />

  if (!dbUser.selectedPackage || !dbUser.subscriptionActive)
    return <AccessDenied message="You need an active subscription to access these tools." />

  return <ToolsSlider userPackageName={dbUser.selectedPackage.name} />
}

export default OurFitnessServer

const AccessDenied = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-4">⚠️ Access Denied</h2>
    <p className="text-gray-300 text-lg mb-6">{message}</p>
  </div>
)
