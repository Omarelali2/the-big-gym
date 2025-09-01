"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getAllExercises } from "@/lib/data" 

type ExerciseType = {
  id: string
  title: string
  description?: string | null
  images: string[]
}

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<ExerciseType[]>([])

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getAllExercises()
        setExercises(data)
      } catch (error) {
        console.error(" Error fetching exercises:", error)
      }
    }
    fetchExercises()
  }, [])

  return (
    <div className="px-5 md:px-24 py-10">
      <h2 className="text-3xl font-bold text-white mb-8">Exercises</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center"
          >
            {exercise.images && exercise.images.length > 0 ? (
              <Image
                src={exercise.images[0]}
                alt={exercise.title}
                width={300}
                height={200}
                className="rounded-xl object-cover w-full h-48"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center rounded-xl text-gray-400">
                No Image
              </div>
            )}

            <h3 className="text-xl font-semibold text-white mt-4">
              {exercise.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-3">
              {exercise.description || "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
