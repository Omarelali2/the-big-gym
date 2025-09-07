"use client"

import { useState } from "react"
import Image from "next/image"
import { deleteExerciseAction } from "@/lib/data"
import toast from "react-hot-toast"

type ExerciseType = {
  id: string
  title: string
  description?: string | null
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function ExercisesTable({
  initialExercises,
}: {
  initialExercises: ExerciseType[]
}) {
  const [exercises, setExercises] = useState<ExerciseType[]>(initialExercises)

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this exercise?")) return

    const res = await deleteExerciseAction(id)

    if (res.success) {
      setExercises((prev) => prev.filter((ex) => ex.id !== id))
      toast.success("Exercise deleted successfully")
    } else {
      toast.error(`Error: ${res.error}`)
    }
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 border shadow-lg rounded-lg overflow-hidden bg-white">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Updated At</th>
          <th className="px-4 py-2 text-red-600">Delete</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {exercises.map((exercise) => (
          <tr key={exercise.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-2 font-medium">{exercise.title}</td>
            <td className="px-4 py-2">{exercise.description || "-"}</td>
            <td className="px-4 py-2">
              {exercise.images?.length > 0 ? (
                <Image
                  src={exercise.images[0]}
                  alt={exercise.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover w-16 h-16"
                />
              ) : (
                "-"
              )}
            </td>
            <td className="px-4 py-2">
              {exercise.createdAt
                ? new Date(exercise.createdAt).toLocaleDateString()
                : "-"}
            </td>
            <td className="px-4 py-2">
              {exercise.updatedAt
                ? new Date(exercise.updatedAt).toLocaleDateString()
                : "-"}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleDelete(exercise.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
