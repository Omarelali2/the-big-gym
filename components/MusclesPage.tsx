"use client"

import { deleteMuscleAction } from "@/lib/data"
import Image from "next/image"
import { useState } from "react"

interface Exercise {
  id: string
  name?: string
  title?: string
  description?: string | null
  imageUrl?: string | null
  images?: string[]
  videoUrl?: string | null
  muscleId?: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

interface Workout {
  id: string
  name: string
  description?: string | null
  images?: string[]
}

interface Muscle {
  id: string
  name: string
  slug: string
  description?: string | null
  workout?: Workout | null
  exercises: Exercise[]
  imageUrl?: string | null
  iconUrl?: string | null
  createdAt: string | Date
  updatedAt: string | Date
}



export default function MusclesPage({
  initialMuscles,
}: {
  initialMuscles: Muscle[]
}) {
  const [muscles, setMuscles] = useState(initialMuscles)

  const handleDelete = async (id: string) => {
    const res = await deleteMuscleAction(id)
    if (res.success) {
      setMuscles(muscles.filter(m => m.id !== id))
    } else {
      alert(`Error: ${res.error}`)
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-white'>All Muscles</h1>

      <table className='min-w-full divide-y divide-gray-200 border shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Slug</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Workout Type</th>
            <th className='px-4 py-2'>Exercises</th>
            <th className='px-4 py-2'>Image</th>
            <th className='px-4 py-2'>Icon</th>
            <th className='px-4 py-2'>Created At</th>
            <th className='px-4 py-2'>Updated At</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-200'>
          {muscles.map(muscle => (
            <tr key={muscle.id} className='hover:bg-gray-50 transition-colors'>
              <td className='px-4 py-2 font-medium'>{muscle.name}</td>
              <td className='px-4 py-2'>{muscle.slug}</td>
              <td className='px-4 py-2'>{muscle.description || "-"}</td>
              <td className='px-4 py-2'>{muscle.workout?.name || "-"}</td>
              <td className='px-4 py-2'>{muscle.exercises.length}</td>
              <td className='px-4 py-2'>
                {muscle.imageUrl ? (
                  <Image
                    width={48}
                    height={48}
                    src={muscle.imageUrl}
                    alt={muscle.name}
                    className='w-10 h-10 rounded-lg object-cover'
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className='px-4 py-2'>
                {muscle.iconUrl ? (
                  <Image
                    width={48}
                    height={48}
                    src={muscle.iconUrl}
                    alt={muscle.name + " icon"}
                    className='w-8 h-8 object-contain'
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className='px-4 py-2'>
                {new Date(muscle.createdAt).toLocaleDateString()}
              </td>
              <td className='px-4 py-2'>
                {new Date(muscle.updatedAt).toLocaleDateString()}
              </td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleDelete(muscle.id)}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
