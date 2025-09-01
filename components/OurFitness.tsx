"use client"
import { dataTools } from "@/constants/data"
import Image from "next/image"
import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const OurFitness = () => {
  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4
  const totalSlides = Math.ceil(dataTools.length / itemsPerPage)

  const nextSlide = () => {
    if (current < (totalSlides - 1) * itemsPerPage) {
      setCurrent(current + itemsPerPage)
    }
  }

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - itemsPerPage)
    }
  }

  return (
    <div className='px-5 md:px-24 py-10 relative'>
      <div className='absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60'></div>
      <div className='absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60'></div>

      <div className='flex flex-row justify-between items-center mb-10'>
        <div>
          <h2 className='text-3xl font-bold text-white mb-2'>
            Our Fitness <span className='text-red-500'>Tools</span>
          </h2>
        </div>

        <div className='flex flex-col items-center gap-3'>
          <div className='flex gap-2'>
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
              disabled={current + itemsPerPage >= dataTools.length}
              className={`p-2 rounded-md ${
                current + itemsPerPage >= dataTools.length
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-red-500 transition"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className='flex mt-1'>
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
      <div>
        <p className='text-gray-400 text-center text-lg'>
          Access a variety of tools to help you reach your fitness goals more
          effectively
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {dataTools
          .slice(current, current + itemsPerPage)
          .map((service, index) => (
            <div
              key={index}
              className='relative rounded-lg overflow-hidden shadow-lg bg-black/40 p-5 text-center'
            >
              <div className='relative overflow-hidden'>
                <Image
                  src={service.image}
                  alt={`Tool ${index + 1}`}
                  className='w-full h-auto rounded-md transform transition-transform duration-500 hover:scale-105 hover:rotate-1'
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OurFitness
