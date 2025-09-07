"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { banner_1, Frame } from "@/images"
import { useUser, SignInButton } from "@clerk/nextjs"

interface Stats {
  totalCoaches: number
  totalUsers: number
  totalExercises: number
  activeSubscribers: number
}
export default function HomeBannerClient({ stats }: { stats: Stats }) {
  const { isSignedIn } = useUser()

  return (
    <div className='py-16 md:py-0 bg-shop_light_pink rounded-lg text-center px-10 lg:px-24 flex flex-col md:flex-row items-center justify-between'>
      <div className='space-y-5 flex items-center flex-col md:items-start md:text-left md:mr-10'>
        <Image src={Frame} alt='Frame' className='w-150' />
        <p className='text-base text-white leading-relaxed max-w-xl mb-4 tracking-wide'>
          &quot;Join the Fitmaker community and transform your fitness journey.
          Our expert coaches and personalized programs are designed to help you
          achieve your goals and exceed your expectations. Ready to make a
          change?&quot;
        </p>

        <div className='flex gap-8 mt-4 flex-col sm:flex-row'>
          {isSignedIn ? (
            <>
              <Link
                href={"/clients/tools"}
                className='text-sm font-semibold w-50 md:w-70 text-center bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 hover:text-gray-200 px-3 py-2 cursor-pointer'
              >
                Start Your Journey
              </Link>
              <Link
                href={"/clients/programs"}
                className='text-sm border-2 w-50 md:w-70 text-center border-red-500 font-semibold rounded-2xl px-3 py-2 hover:text-red-900 duration-500 hover:border-red-500 text-red-500 cursor-pointer'
              >
                Explore Programs
              </Link>
            </>
          ) : (
            <>
              <SignInButton>
                <button className='text-sm font-semibold w-50 md:w-70 text-center bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 hover:text-gray-200 px-3 py-2 cursor-pointer'>
                  Start Your Journey
                </button>
              </SignInButton>
              <SignInButton>
                <button className='text-sm border-2 w-50 md:w-70 text-center border-red-500 font-semibold rounded-2xl px-3 py-2 hover:text-red-900 duration-500 hover:border-red-500 text-red-500 cursor-pointer'>
                  Explore Programs
                </button>
              </SignInButton>
            </>
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

        {/* coaches box */}
        <div
          className='absolute top-20 left-10 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
        >
          <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
            + {stats.totalCoaches}
            <br /> Coaches
          </div>
        </div>

        {/* reviews */}
        <div
          className='absolute top-20 -right-2 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
        >
          <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
            + {stats.totalUsers} <br /> User Log
          </div>
        </div>

        {/* workout videos */}
        <div
          className='absolute -bottom-8 left-5 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
        >
          <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
            + {stats.totalExercises} <br /> Exercises
          </div>
        </div>

        {/* trainers */}
        <div
          className='absolute bottom-0 right-1 rounded-lg shadow-lg 
                p-[2px] bg-gradient-to-r from-red-500 to-orange-500
                transform transition duration-300 ease-in-out hover:scale-110'
        >
          <div className='bg-black/80 text-white px-4 py-2 rounded-lg'>
            + {stats.activeSubscribers} <br /> Subscribers
          </div>
        </div>
      </div>
    </div>
  )
}
