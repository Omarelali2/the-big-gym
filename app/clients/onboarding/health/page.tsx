"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveUserFitnessData, FitnessData } from "@/lib/action"
import {
  Loader2,
  Scale,
  Dumbbell,
  PercentDiamond,
  Activity,
  Target,
  UserCheck,
} from "lucide-react"

export default function FitnessWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState<FitnessData>({
    height: undefined,
    weight: undefined,
    bodyFat: undefined,
    muscleMass: undefined,
    activityLevel: undefined,
    fitnessGoal: undefined,
    experienceLevel: undefined,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value) || value,
    }))
  }

  const nextStep = () => setStep(prev => prev + 1)

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")
    try {
      await saveUserFitnessData(form)
      router.push("/clients/programs")
    } catch (error: unknown) {
      let message = "Unknown error"
      if (error instanceof Error) message = error.message
      console.error("❌ Error fetching packages:", message)
      return { success: false, error: message, packages: [] }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-15 flex items-center justify-center bg-gradient-to-br  p-4'>
      <div className='w-full max-w-md p-8 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 shadow-2xl rounded-3xl text-white'>
        <h1 className='text-3xl font-extrabold mb-8 text-center text-gray-100'>
          Update Your Fitness Profile
        </h1>

        {/* Step 1: Height */}
        {step === 1 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <Scale className='w-6 h-6 text-blue-400' /> Enter your height (cm)
            </label>
            <input
              type='number'
              name='height'
              placeholder='Height (cm)'
              min={50}
              max={250}
              value={form.height ?? ""}
              onChange={handleChange}
              className='p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <button
              onClick={nextStep}
              disabled={!form.height}
              className='bg-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Weight */}
        {step === 2 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <Dumbbell className='w-6 h-6 text-red-400' /> Enter your weight
              (kg)
            </label>
            <input
              type='range'
              name='weight'
              min={30}
              max={200}
              value={form.weight ?? 70}
              onChange={handleChange}
              className='w-full accent-indigo-600'
            />
            <p className='text-center'>{form.weight ?? "--"} kg</p>
            <button
              onClick={nextStep}
              disabled={!form.weight}
              className='bg-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Body Fat */}
        {step === 3 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <PercentDiamond className='w-6 h-6 text-red-400' /> Body Fat (%)
            </label>
            <input
              type='range'
              name='bodyFat'
              min={5}
              max={50}
              step={0.5}
              value={form.bodyFat ?? 20}
              onChange={handleChange}
              className='w-full accent-red-600'
            />
            <p className='text-center'>{form.bodyFat ?? "--"}%</p>
            <button
              onClick={nextStep}
              disabled={!form.bodyFat}
              className='bg-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 4: Muscle Mass */}
        {step === 4 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <Dumbbell className='w-6 h-6 text-green-400' /> Muscle Mass (kg)
            </label>
            <input
              type='range'
              name='muscleMass'
              min={5}
              max={80}
              step={0.5}
              value={form.muscleMass ?? 25}
              onChange={handleChange}
              className='w-full accent-green-600'
            />
            <p className='text-center'>{form.muscleMass ?? "--"} kg</p>
            <button
              onClick={nextStep}
              disabled={!form.muscleMass}
              className='bg-green-600 px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 5: Activity Level */}
        {step === 5 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <Activity className='w-6 h-6 text-purple-400' /> Activity Level
            </label>
            <select
              name='activityLevel'
              value={form.activityLevel ?? ""}
              onChange={handleChange}
              className='p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400'
            >
              <option value=''>Select Activity Level</option>
              <option value='Sedentary'>Sedentary</option>
              <option value='Light'>Light</option>
              <option value='Moderate'>Moderate</option>
              <option value='Active'>Active</option>
              <option value='VeryActive'>Very Active</option>
            </select>
            <button
              onClick={nextStep}
              disabled={!form.activityLevel}
              className='bg-purple-600 px-6 py-3 rounded-2xl font-bold hover:bg-purple-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 6: Fitness Goal */}
        {step === 6 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <Target className='w-6 h-6 text-yellow-400' /> Fitness Goal
            </label>
            <select
              name='fitnessGoal'
              value={form.fitnessGoal ?? ""}
              onChange={handleChange}
              className='p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400'
            >
              <option value=''>Select Fitness Goal</option>
              <option value='LoseWeight'>Lose Weight</option>
              <option value='GainMuscle'>Gain Muscle</option>
              <option value='Maintain'>Maintain</option>
              <option value='Endurance'>Endurance</option>
            </select>
            <button
              onClick={nextStep}
              disabled={!form.fitnessGoal}
              className='bg-yellow-600 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-700 transition'
            >
              Next
            </button>
          </div>
        )}

        {/* Step 7: Experience Level */}
        {step === 7 && (
          <div className='flex flex-col gap-4'>
            <label className='flex items-center gap-2'>
              <UserCheck className='w-6 h-6 text-pink-400' /> Experience Level
            </label>
            <select
              name='experienceLevel'
              value={form.experienceLevel ?? ""}
              onChange={handleChange}
              className='p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400'
            >
              <option value=''>Select Experience Level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.experienceLevel}
              className='flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-3xl text-lg font-bold hover:from-red-700 hover:to-cyan-600 transition-all duration-700 shadow-lg disabled:opacity-50'
            >
              {loading ? (
                <Loader2 className='animate-spin h-6 w-6' />
              ) : (
                "Finish"
              )}
            </button>
          </div>
        )}

        {message && (
          <p className='mt-5 text-center text-gray-200 font-medium'>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
