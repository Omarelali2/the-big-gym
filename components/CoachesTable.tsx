"use client"

import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { deleteCoachAction } from "@/lib/data"
import Image from "next/image"

type CoachType = {
  id: string
  name: string
  email: string
  imageUrl?: string | null
  speciality: string
  degree: string
  available: boolean
}

export default function CoachesTable({
  initialCoaches,
}: {
  initialCoaches: CoachType[]
}) {
  const [coaches, setCoaches] = useState<CoachType[]>(initialCoaches)

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this coach?")) return

    const res = await deleteCoachAction(id)

    if (res.success) {
      setCoaches(prev => prev.filter(coach => coach.id !== id))
      toast.success("Coach deleted successfully")
    } else {
      toast.error(`Error: ${res.error}`)
    }
  }

  return (
    <table className='min-w-full divide-y divide-gray-200 border shadow-lg rounded-lg overflow-hidden bg-white'>
      <thead className='bg-gray-50'>
        <tr>
          <th className='px-4 py-2'>Profile</th>
          <th className='px-4 py-2'>Name</th>
          <th className='px-4 py-2'>Email</th>
          <th className='px-4 py-2'>Speciality</th>
          <th className='px-4 py-2'>Degree</th>
          <th className='px-4 py-2'>Available</th>
          <th className='px-4 py-2 text-red-600'>Delete</th>
          <th className='px-4 py-2 text-blue-600'>Edit</th>
        </tr>
      </thead>

      <tbody className='divide-y divide-gray-200'>
        {coaches.map(coach => (
          <tr key={coach.id} className='hover:bg-gray-50 transition-colors'>
            <td className='px-4 py-2'>
              <Image
                width={48}
                height={48}
                src={coach.imageUrl || "/default-profile.png"}
                alt={coach.name || "Coach"}
                className='w-10 h-10 rounded-full object-cover'
              />
            </td>
            <td className='px-4 py-2 font-medium'>{coach.name}</td>
            <td className='px-4 py-2'>{coach.email}</td>
            <td className='px-4 py-2'>{coach.speciality}</td>
            <td className='px-4 py-2'>{coach.degree}</td>
            <td className='px-4 py-2'>{coach.available ? "Yes" : "No"}</td>
            <td className='px-4 py-2'>
              <button
                onClick={() => handleDelete(coach.id)}
                className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm'
              >
                Delete
              </button>
            </td>
            <td className='px-4 py-2'>
              <Link
                href={`/dashboard/list-coach/${coach.id}`}
                className='text-blue-600 hover:underline'
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
