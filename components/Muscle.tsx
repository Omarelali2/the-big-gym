"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { getMuscles, getAllWorkouts } from "@/lib/data"
import { getUserSubscription } from "@/lib/action"
import Image from "next/image"

type Exercise = { id: string; title: string }

type Muscle = {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string | null
  iconUrl?: string | null
  workoutId?: string | null
  exercises: Exercise[]
}

type WorkoutType = {
  id: string
  name: string
}

export default function MusclesPage() {
  const router = useRouter()

  const { user, isSignedIn } = useUser()

  const [muscles, setMuscles] = useState<Muscle[]>([])
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [workouts, setWorkouts] = useState<WorkoutType[]>([])

  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!user) return

      const res = await getMuscles()
      if (res.success) setMuscles(res.muscles as Muscle[])

      const allWorkouts = await getAllWorkouts()
      setWorkouts(allWorkouts)

      const subData = await getUserSubscription(user.id)
      setSubscriptionActive(subData.subscriptionActive || subData.isAdmin)

    

      setLoading(false)
    }

    loadData()
  }, [user])

  const handleClick = (href: string) => {
    if (subscriptionActive) {
      router.push(href)
    } else {
      setShowAlert(true)
    }
  }
  if (!isSignedIn) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>
          ⚠️ Access Denied
        </h2>
        <p className='text-gray-300 text-lg mb-6'>
          You need to log in to view our exclusive plans.
        </p>
      </div>
    )
  }
  if (loading)
    return (
      <div className='flex items-center justify-center mt-20 min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin'></div>
        <span className='ml-4 text-white text-lg font-semibold'>
          Loading...
        </span>
      </div>
    )

  const filteredMuscles = muscles.filter(m => {
    const matchMuscle = selectedMuscle ? m.name === selectedMuscle : true
    const matchWorkout = selectedWorkout
      ? m.workoutId === selectedWorkout
      : true
    return matchMuscle && matchWorkout
  })

  const muscleOptions = Array.from(new Set(muscles.map(m => m.name)))

  return (
    <div className='px-10 mt-15 py-10 bg-gradient-to-b min-h-screen'>
      <h1 className='text-5xl font-bold mb-10 text-center text-white'>
        All Muscles
      </h1>

      <div className='flex flex-wrap gap-4 mb-6 justify-center'>
        <select
          value={selectedMuscle || ""}
          onChange={e => setSelectedMuscle(e.target.value || null)}
          className='p-2 rounded-md bg-gray-800 text-white border border-red-600'
        >
          <option value=''>All Muscles</option>
          {muscleOptions.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={selectedWorkout || ""}
          onChange={e => setSelectedWorkout(e.target.value || null)}
          className='p-2 rounded-md bg-gray-800 text-white border border-orange-600'
        >
          <option value=''>All Workouts</option>
          {workouts.map(w => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {filteredMuscles.map(m => (
          <div
            key={m.id}
            onClick={() => handleClick(`/clients/programs/${m.slug}`)}
            className='border-2 border-red-600 bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-700 hover:scale-101 p-4 flex flex-col max-h-96 cursor-pointer'
          >
            <div className='flex items-center mb-3'>
              {m.iconUrl && (
                <Image
                  width={48}
                  height={48}
                  src={m.iconUrl}
                  alt={m.name}
                  className='w-10 h-10 mr-2 rounded-full border-2 border-black hover:animate-spin transition-transform'
                />
              )}
              <h2 className='text-xl font-bold text-white'>{m.name}</h2>
            </div>
            {m.imageUrl && (
              <Image
                width={48}
                height={48}
                src={m.imageUrl || "/default-image.png"} // fallback image
                alt={m.name}
                className='w-full h-32 object-cover rounded-md mb-2 hover:scale-105 transition-transform'
                unoptimized // هيك Next.js ما رح يحاول يعمل optimize
              />
            )}
            {m.description && (
              <p className='text-gray-200 text-sm mb-2 line-clamp-2'>
                {m.description}
              </p>
            )}
            <div className='flex justify-between items-center mb-2'>
              <span className='text-white font-semibold bg-orange-600 px-2 py-1 rounded-full text-xs'>
                {m.exercises.length} Exercises
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn'>
          <div className='bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-2xl text-center max-w-sm shadow-2xl border-2 border-red-500'>
            <h2 className='text-3xl font-extrabold text-red-500 mb-4 drop-shadow-lg'>
              ⚠️ Access Denied
            </h2>
            <p className='text-white mb-6 text-sm md:text-base'>
              You need to subscribe to access this content.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className='bg-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
