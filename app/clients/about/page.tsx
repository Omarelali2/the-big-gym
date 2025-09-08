"use client"
import React from "react"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"

export default function AboutPage() {
  const { isSignedIn } = useUser()
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
  return (
    <div className='px-6 md:px-20 lg:px-40 xl:px-64 py-12 min-h-screen'>
      <div className='text-center text-3xl md:text-4xl font-extrabold pt-10 text-white mb-12'>
        <p>
          About <span className='text-red-600'>US</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto'>
        <Image
          width={48}
          height={48}
          unoptimized
          className='w-full md:w-3/5 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 object-cover max-h-[520px]'
          src='https://labuwiki.com/wp-content/uploads/2021/10/22-13.jpg'
          alt='Contact Us'
        />

        <div className='flex flex-col h-100 justify-start items-start gap-4 text-red-700 md:w-1/2'>
          <p className='text-lg md:text-xl font-semibold '>ABOUT OUR GYM</p>
          <p className='text-white leading-relaxed text-base md:text-lg'>
            Our gym offers modern equipment and professional trainers to help
            you reach your fitness goals.
          </p>

          <p className='text-lg md:text-xl font-semibold mt-6'>Contact</p>
          <p className='text-white leading-relaxed text-base md:text-lg'>
            123 Fitness Street, Akkar-Dawsa <br />
            <strong>Tel:</strong> +961 70 259 020 <br />
            <strong>Email:</strong> elaliomar30@gmail.com
          </p>

          <button className='cursor-pointer bg-red-600 text-white px-8 py-4 text-sm md:text-base font-medium rounded-full shadow-md hover:bg-red-700 transition-all duration-500'>
            Join Our Gym
          </button>
        </div>
      </div>
    </div>
  )
}
