"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getAllWorkouts } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Workout {
  id: string
  name: string
  description?: string
  images?: string[]
}

export default function Service() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4

  const nextSlide = () => {
    if (current + itemsPerPage < workouts.length) {
      setCurrent(current + itemsPerPage)
    }
  }

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - itemsPerPage)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWorkouts()

      const normalizedData: Workout[] = data.map(w => ({
        id: w.id,
        name: w.name,
        description: w.description ?? "",
        images: w.images ?? [],
      }))

      setWorkouts(normalizedData)
    }
    fetchData()
  }, [])

  const handleClick = (workoutId: string) => {
    router.push(`/clients/programs?workout=${workoutId}`)
  }

  const displayedWorkouts = workouts.slice(current, current + itemsPerPage)

  return (
    <div className='px-6 py-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-white mb-2'>
          Our <span className='text-red-500'>Workouts</span>
        </h2>
        <p className='text-gray-400 text-lg'>
          Browse and explore our workouts. Pick the one that fits your goals!
        </p>
      </div>

      <div className='flex justify-center gap-4 mb-6'>
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className={`p-2 rounded-md ${
            current === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-black/50 text-white hover:bg-red-500 transition"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          disabled={current + itemsPerPage >= workouts.length}
          className={`p-2 rounded-md ${
            current + itemsPerPage >= workouts.length
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-black/50 text-white hover:bg-red-500 transition"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {displayedWorkouts.map(workout => (
          <div
            key={workout.id}
            onClick={() => handleClick(workout.id)}
            className='flex flex-col rounded-lg overflow-hidden shadow-lg bg-gray-900 h-full cursor-pointer'
          >
            <div className='relative w-full aspect-[4/3] overflow-hidden'>
              <Image
                src={workout.images?.[0] || "/default.jpg"}
                alt={workout.name}
                fill
                className='object-cover rounded-md transform transition-transform duration-500 hover:scale-105 hover:rotate-1'
              />
            </div>
            <div className='p-3 flex-1 flex flex-col justify-between'>
              <h3 className='text-lg font-bold text-white'>{workout.name}</h3>
              <p className='text-gray-400 text-sm line-clamp-3'>
                {workout.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
