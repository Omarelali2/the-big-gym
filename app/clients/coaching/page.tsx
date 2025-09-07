import { currentUser } from "@clerk/nextjs/server" // ✅ server-side only
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

export default async function CoachesPage() {
  const user = await currentUser() // 🔹 جلب المستخدم الحالي

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>⚠️ Access Denied</h2>
        <p className='text-gray-300 text-lg mb-6'>You need to log in to view our exclusive plans.</p>
      </div>
    )
  }

  // 🔹 جلب المستخدم من DB مع الباقة
  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: { selectedPackage: true },
  })

  if (!dbUser || dbUser.selectedPackage?.name !== "Premium") {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>⚠️ Access Denied</h2>
        <p className='text-gray-300 text-lg mb-6'>You need a Premium package to access coaches.</p>
      </div>
    )
  }

  // 🔹 جلب الكوتشز
  const coaches = await db.coach.findMany({ include: { workout: true } })

  if (coaches.length === 0) {
    return <p className='text-gray-400 p-6'>No coaches found.</p>
  }

  return (
    <div className='p-6 grid mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {coaches.map(coach => (
        <Link
          key={coach.id}
          href={`/clients/coaching/${coach.id}`}
          className='bg-gray-800 p-4 rounded-2xl border-2 border-red-700 shadow-lg flex flex-col items-center text-white hover:shadow-2xl transition transform hover:-translate-y-1'
        >
          {coach.imageUrl ? (
            <Image
              src={coach.imageUrl}
              alt={coach.name}
              width={100}
              height={100}
              className='rounded-full mb-3 object-cover'
            />
          ) : (
            <div className='w-24 h-24 bg-gray-600 rounded-full mb-3 flex items-center justify-center'>
              No Image
            </div>
          )}
          <h3 className='text-xl font-bold'>{coach.name}</h3>
          <p className='text-yellow-400 font-semibold mb-2'>Fees: ${coach.fees}</p>
          {coach.workout && <p className='text-gray-400 text-sm'>Workout: {coach.workout.name}</p>}
        </Link>
      ))}
    </div>
  )
}
