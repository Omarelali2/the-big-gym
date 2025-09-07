"use client"

import { useState } from "react"
import { User, Ruler, Calendar, Activity, Info } from "lucide-react"

export default function CaloriesCalculator() {
  const [weight, setWeight] = useState<number>(70)
  const [height, setHeight] = useState<number>(175)
  const [age, setAge] = useState<number>(25)
  const [gender, setGender] = useState<"male" | "female">("male")
  const [activity, setActivity] = useState<number>(1.55)
  const [goal, setGoal] = useState<"LoseWeight" | "Maintain" | "GainMuscle">(
    "Maintain"
  )
  const [result, setResult] = useState<number | null>(null)
  const [bmi, setBmi] = useState<number | null>(null)
  const [water, setWater] = useState<number | null>(null)
  const [protein, setProtein] = useState<number | null>(null)

  const calculateCalories = () => {
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161

    const calories = bmr * activity
    setResult(Math.round(calories))

    // BMI
    const bmiVal = weight / (height / 100) ** 2
    setBmi(Math.round(bmiVal * 10) / 10)

    // Water intake (ml/day)
    setWater(Math.round(weight * 35))

    // Protein intake (g/day)
    const proteinVal =
      goal === "LoseWeight"
        ? Math.round(weight * 1.5)
        : goal === "GainMuscle"
        ? Math.round(weight * 2)
        : Math.round(weight * 1.8)
    setProtein(proteinVal)
  }

  return (
    <div className='flex items-center justify-center mt-15 p-6'>
      <div className=' md:w-full bg-gray-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden'>
        <div className='absolute -top-16 -right-16 w-40 h-40 bg-orange-300 rounded-full opacity-30 blur-3xl'></div>
        <div className='absolute -bottom-16 -left-16 w-56 h-56 bg-red-400 rounded-full opacity-30 blur-3xl'></div>

        <h1
          className='text-5xl sm:text-3xl font-extrabold text-center bg-clip-text text-transparent 
               bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 
               tracking-wide drop-shadow-lg mb-5'
        >
          Calories Calculator
        </h1>

        <div className='space-y-4 text-white'>
          {/* Weight */}
          <div className='flex items-center border text-white border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <User className='w-5 h-5 mr-3 text-orange-500' />
            <input
              type='number'
              placeholder='Weight (kg)'
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              className='w-full outline-none'
            />
          </div>

          {/* Height */}
          <div className='flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <Ruler className='w-5 h-5 mr-3 text-orange-500' />
            <input
              type='number'
              placeholder='Height (cm)'
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              className='w-full outline-none'
            />
          </div>

          {/* Age */}
          <div className='flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <Calendar className='w-5 h-5 mr-3 text-orange-500' />
            <input
              type='number'
              placeholder='Age'
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              className='w-full outline-none'
            />
          </div>

          {/* Gender */}
          <div className='flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <User className='w-5 h-5 mr-3 text-orange-500' />
            <select
              value={gender}
              onChange={e => setGender(e.target.value as "male" | "female")}
              className='w-full outline-none bg-transparent'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>

          {/* Activity */}
          <div className='flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <Activity className='w-5 h-5 mr-3 text-orange-500' />
            <select
              value={activity}
              onChange={e => setActivity(Number(e.target.value))}
              className='w-full outline-none bg-transparent'
            >
              <option value={1.2}>Sedentary</option>
              <option value={1.375}>Light</option>
              <option value={1.55}>Moderate</option>
              <option value={1.725}>Active</option>
              <option value={1.9}>Very Active</option>
            </select>
          </div>

          {/* Goal */}
          <div className='flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition'>
            <Info className='w-5 h-5 mr-3 text-orange-500' />
            <select
              value={goal}
              onChange={e =>
                setGoal(
                  e.target.value as "LoseWeight" | "Maintain" | "GainMuscle"
                )
              }
              className='w-full outline-none bg-transparent'
            >
              <option value='LoseWeight'>Lose Weight</option>
              <option value='Maintain'>Maintain</option>
              <option value='GainMuscle'>Gain Muscle</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateCalories}
          className='w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300'
        >
          Calculate
        </button>

        {result && (
          <div className='mt-6 p-4 bg-gray-600 rounded-xl text-center shadow-inner animate-fadeIn'>
            <p className='text-lg font-medium text-gray-800'>
              Your daily calorie needs:
            </p>
            <p className='text-2xl font-bold text-orange-600'>{result} kcal</p>
            <p className='text-md text-gray-300 mt-2'>BMI: {bmi}</p>
            <p className='text-md text-gray-300 mt-1'>Water: {water} ml/day</p>
            <p className='text-md text-gray-300 mt-1'>
              Protein: {protein} g/day
            </p>
            <p className='text-sm text-gray-100 mt-2'>
              Tip: Adjust your calories according to your goal.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
