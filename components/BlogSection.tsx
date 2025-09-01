"use client"
import React, { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"
import Image from "next/image"
import { dataImg } from "@/constants/data"
import Link from "next/link"

const OurFitness = () => {
  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4
  const totalSlides = Math.ceil(dataImg.length / itemsPerPage)

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
    <div className='px-5 md:px-20 py-12 relative  text-white'>
      <div className='absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60 animate-pulse'></div>
      <div className='absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60 animate-pulse'></div>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-3xl font-bold'>
          Fitmaker <span className='text-red-600'>Blog Posts</span>
        </h2>
        <div className='flex flex-col items-center gap-3'>
          <div className='flex gap-2'>
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
              disabled={current + itemsPerPage >= dataImg.length}
              className={`p-2 rounded-md ${
                current + itemsPerPage >= dataImg.length
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-red-500 transition-all duration-300"
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

      <p className='text-zinc-400 mb-8'>
        Discover essential tips to maximize your workout results and reach your
        fitness goals faster.
      </p>

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-1/2 relative rounded-2xl overflow-hidden'>
          <Image
            src={dataImg[0].image}
            alt={dataImg[0].title}
            width={600}
            height={600}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50 p-6 flex flex-col justify-end'>
            <h3 className='text-xl font-bold mb-2'>{dataImg[0].title}</h3>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4 text-sm text-zinc-300'>
                <span className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' /> {dataImg[0].date}
                </span>
                <span className='flex items-center gap-1'>
                  <Dumbbell className='w-4 h-4' /> {dataImg[0].category}
                </span>
              </div>
              <button className='mt-1 text-red-500 hover:underline'>
                Learn More →
              </button>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-1/2 grid grid-cols-2 gap-6'>
          {dataImg.slice(1, 5).map((tool, index) => (
            <div
              key={index}
              className='relative rounded-2xl overflow-hidden aspect-square'
            >
              <Image
                src={tool.image}
                alt={tool.title}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-black/40 p-4 flex flex-col justify-end'>
                <h3 className='text-lg font-semibold'>{tool.title}</h3>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-zinc-400'>{tool.category}</p>
                  <button className='text-red-500 hover:underline text-sm'>
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='text-center mt-9'>
        <Link
          className='text-sm border-2 border-orange-500 font-semibold rounded-md px-3 py-2 hover:text-red-900 duration-500 hover:border-red-500 text-red-500 cursor-pointer'
          href={"/coaching"}
        >
          View All ..
        </Link>
      </div>
    </div>
  )
}

export default OurFitness
