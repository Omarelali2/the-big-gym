import CoachingSlider from "./CoachingSlider"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

const CoachingServer = async () => {
  const user = await currentUser()
  if (!user) return <AccessDenied message="You need to log in" />

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: { selectedPackage: true },
  })

  if (!dbUser || dbUser.selectedPackage?.name !== "Premium") {
    return <AccessDenied message="You need a Premium package" />
  }

  return <CoachingSlider userPackageName={dbUser.selectedPackage.name} />
}

export default CoachingServer

const AccessDenied = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-4">⚠️ Access Denied</h2>
    <p className="text-gray-300 text-lg mb-6">{message}</p>
  </div>
)
