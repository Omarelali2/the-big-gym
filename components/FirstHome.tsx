"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { banner_1, Frame } from "@/images"
import { useUser, SignInButton } from "@clerk/nextjs"

const FirstHome = () => {
  const { isSignedIn } = useUser()

  return (
    <div className='py-16 md:py-0 bg-shop_light_pink rounded-lg text-center px-10 lg:px-24 flex flex-col md:flex-row items-center justify-between'>
      <div className='space-y-5 flex items-center flex-col md:items-start md:text-left md:mr-10'>
        <Image src={Frame} alt='Frame' className='w-150' />
        <p className='text-base text-white text-center leading-relaxed max-w-xl mb-4 tracking-wide'>
          &quot;Join the Fitmaker community and transform your fitness journey.
          Our expert coaches and personalized programs are designed to help you
          achieve your goals and exceed your expectations. Ready to make a
          change?&quot;
        </p>
        <div className='flex gap-8 mt-4 flex-col text-center sm:flex-row'>
          {isSignedIn ? (
            <Link
              href={"/clients"}
              className='text-xl  pt-4 h-15 md:ml-43 font-semibold w-50 md:w-70 text-center bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 hover:text-gray-200 px-3 py-2 cursor-pointer'
            >
              Get Started
            </Link>
          ) : (
            <SignInButton>
              <button className='text-2xl h-20 ml-43 font-semibold w-50 md:w-70 text-center bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 hover:text-gray-200 px-3 py-2 cursor-pointer'>
                Get Started
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      <div className='relative flex items-center justify-center mt-10 md:mt-0'>
        <div>
          <Image
            src={banner_1}
            alt='banner_1'
            className=' w-[450px] rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.6)]'
          />
        </div>

        {/* أكاونت الإحصائيات */}
        <div className="md:block hidden">
          <div
            className='absolute top-20 left-10 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110 '
          >
            <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
              + 80 <br /> Coaches
            </div>
          </div>
          <div
            className='absolute top-20 -right-2 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
          >
            <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
              + 1300 <br /> Positive Reviews
            </div>
          </div>
          <div
            className='absolute -bottom-8 left-5 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
          >
            <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
              + 1000 <br /> Workout Videos
            </div>
          </div>
          <div
            className='absolute bottom-0 right-1 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
          >
            <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
              + 1500 <br /> Trainers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstHome
