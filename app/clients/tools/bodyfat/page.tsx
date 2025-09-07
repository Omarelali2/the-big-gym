"use client"

import { useState } from "react"
import { User, Ruler } from "lucide-react"

export default function BodyFatCalculator() {
  const [weight, setWeight] = useState<number>(70)
  const [waist, setWaist] = useState<number>(80)
  const [neck, setNeck] = useState<number>(40)
  const [hip, setHip] = useState<number>(90) // only for females
  const [gender, setGender] = useState<"male" | "female">("male")
  const [bodyFat, setBodyFat] = useState<number | null>(null)

  const calculateBodyFat = () => {
    let bf = 0
    if (gender === "male") {
      bf =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(weight)) -
        450
    } else {
      bf =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(weight)) -
        450
    }
    setBodyFat(Math.round(bf * 10) / 10)
  }

  return (
    <div className='flex mt-15 items-center justify-center p-6'>
      <div className='w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 relative overflow-hidden'>
       
        <h1 className='text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-500 drop-shadow-lg mb-6'>
          Body Fat Calculator
        </h1>

        <div className='space-y-4 text-white'>
          {/* Weight */}
          <div className='flex flex-col'>
            <label className='text-gray-200 mb-1 font-medium'>
              Weight (kg)
            </label>
            <div className='flex items-center border border-gray-600 rounded-xl p-3 focus-within:ring-2 focus-within:ring-red-400 transition'>
              <User className='w-5 h-5 mr-3 text-red-400' />
              <input
                type='number'
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className='w-full bg-transparent outline-none text-white'
                min={1}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            {/* Waist */}{" "}
            <label className='text-gray-200 mb-1 font-medium'>Waist (cm)</label>
            <div className='flex items-center border border-gray-600 rounded-xl p-3 focus-within:ring-2 focus-within:ring-red-400 transition'>
              <Ruler className='w-5 h-5 mr-3 text-red-400' />
              <input
                type='number'
                placeholder='Waist (cm)'
                value={waist}
                onChange={e => setWaist(Number(e.target.value))}
                className='w-full bg-transparent outline-none placeholder-gray-400 text-white'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-200 mb-1 font-medium'>Neck (cm)</label>
            <div className='flex items-center border border-red-600 rounded-xl p-3 focus-within:ring-2 focus-within:ring-red-400 transition'>
              <Ruler className='w-5 h-5 mr-3 text-red-400' />
              <input
                type='number'
                placeholder='Neck (cm)'
                value={neck}
                onChange={e => setNeck(Number(e.target.value))}
                min={1}
                className='w-full bg-transparent outline-none placeholder-gray-400 text-white'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            {gender === "female" && (
              <div className='flex flex-col'>
                <label className='text-gray-200 mb-1 font-medium'>
                  Hip (cm)
                </label>
                <div className='flex items-center border border-red-600 rounded-xl p-3 focus-within:ring-2 focus-within:ring-red-400 transition'>
                  <Ruler className='w-5 h-5 mr-3 text-red-400' />
                  <input
                    type='number'
                    placeholder='Hip (cm)'
                    value={hip}
                    onChange={e => setHip(Number(e.target.value))}
                    min={1}
                    className='w-full bg-transparent outline-none placeholder-gray-400 text-white'
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex items-center border border-gray-600 rounded-xl p-3 focus-within:ring-2 focus-within:ring-red-400 transition'>
            <User className='w-5 h-5 mr-3 text-red-400' />
            <select
              value={gender}
              onChange={e => setGender(e.target.value as "male" | "female")}
              className='w-full bg-transparent outline-none text-black'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateBodyFat}
          className='w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300'
        >
          Calculate
        </button>

        {bodyFat && (
          <div className='mt-6 p-6 bg-gray-700 rounded-xl text-center shadow-inner animate-fadeIn'>
            <p className='text-lg font-medium text-purple-200'>
              Your Body Fat %:
            </p>
            <p className='text-3xl font-bold text-orange-400'>{bodyFat} %</p>
            <p className='text-sm text-gray-400 mt-2'>
              Tip: Maintain a healthy diet and exercise regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
