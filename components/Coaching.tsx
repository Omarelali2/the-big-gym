"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllCoaches } from "@/lib/data" // function جديدة لجلب كل المدربين

const Coaching = () => {
  const [coaches, setCoaches] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCoaches()
        setCoaches(data)
      } catch (err) {
        console.error("Failed to fetch coaches:", err)
      }
    }
    fetchData()
  }, [])

  const totalSlides = Math.ceil(coaches.length / itemsPerPage)

  const nextSlide = () => {
    if (current + itemsPerPage < coaches.length) {
      setCurrent(current + itemsPerPage)
    }
  }

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - itemsPerPage)
    }
  }

  return (
    <div className="px-5 md:px-24 py-10 relative">
      {/* Background effects */}
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60 animate-pulse"></div>
      <div className="absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60 animate-pulse"></div>

      {/* Header & navigation */}
      <div className="flex flex-row justify-between items-center mb-3">
        <h2 className="text-3xl font-bold text-white mb-2">
          Our Fitness <span className="text-red-500">Coaches</span>
        </h2>
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={current === 0}
              className={`p-2 rounded-md ${
                current === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-red-500 transition-all duration-300"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={current + itemsPerPage >= coaches.length}
              className={`p-2 rounded-md ${
                current + itemsPerPage >= coaches.length
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-red-500 transition-all duration-300"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex mt-1">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`h-3 w-9 mx-1 rounded-full ${
                  current / itemsPerPage === i ? "bg-red-500" : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-center text-lg mb-9">
        Access a variety of coaches to help you reach your fitness goals more effectively
      </p>

      {/* Coaches grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coaches
          .slice(current, current + itemsPerPage)
          .map((coach, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-2xl flex flex-col items-center transform transition-transform duration-500 hover:scale-105 hover:rotate-1"
            >
              <div className="relative overflow-hidden w-full">
                <Image
                  src={coach.imageUrl || "/default.jpg"}
                  alt={coach.name}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-md transition-transform duration-500 hover:scale-110 hover:rotate-2"
                />
              </div>

              <div className="w-full bg-gray-900 bg-opacity-80 p-4 mt-[-4px]">
                <h3 className="text-white font-bold text-lg">{coach.name}</h3>
                <p className="text-gray-500 font-semibold mb-3">{coach.speciality}</p>
                <Link
                  href={`/coaches/${coach.id}`}
                  className="px-0 py-2 text-white hover:text-red-500 transition-all duration-300"
                >
                  View More <span className="text-1xl text-red-600">→</span>
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-7">
        <Link
          href={"/coaching"}
          className="text-sm border-2 border-orange-500 font-semibold rounded-md px-3 py-2 hover:text-red-900 duration-500 hover:border-red-500 text-red-500 cursor-pointer"
        >
          View All ..
        </Link>
      </div>
    </div>
  )
}

export default Coaching
