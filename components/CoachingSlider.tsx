"use client"
import React, { useEffect, useState } from "react"
import { getAllCoaches } from "@/lib/data"
import Image from "next/image"
import toast from "react-hot-toast"

type Props = { userPackageName: string }

interface Coach {
  id: string
  name: string
  speciality: string
  imageUrl: string
}

const CoachingSlider = ({ userPackageName }: Props) => {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCoaches()

      const mappedData: Coach[] = data.map(c => ({
        id: c.id, 
        name: c.workout?.name || "No Name",
        speciality: "Speciality Placeholder", 
        imageUrl: c.workout?.images[0] || "/default-coach.png",
      }))

      setCoaches(mappedData)
    }

    fetchData()
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
      {coaches.slice(current, current + itemsPerPage).map(coach => (
        <div
          key={coach.id}
          className='relative rounded-lg overflow-hidden shadow-2xl flex flex-col items-center transform transition-transform duration-500 hover:scale-105 hover:rotate-1 cursor-pointer'
          onClick={() => {
            if (userPackageName === "Premium") {
              window.location.href = `/clients/coaching/${coach.id}`
            } else {
              toast.error("You need a Premium subscription to view this coach")
            }
          }}
        >
          <div className='w-full h-64 relative overflow-hidden rounded-xl'>
            <Image
              src={coach.imageUrl}
              alt={coach.name}
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='w-full bg-gray-900 bg-opacity-80 p-4 mt-[-4px]'>
            <h3 className='text-white font-bold text-lg'>{coach.name}</h3>
            <p className='text-gray-500 font-semibold mb-3'>
              {coach.speciality}
            </p>
            <span className='px-0 py-2 text-white hover:text-red-500 transition-all duration-300'>
              View More <span className='text-1xl text-red-600'>&rarr;</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoachingSlider
