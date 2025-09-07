"use client"

import { useState } from "react"
import { User, Ruler } from "lucide-react"

export default function BMICalculator() {
  const [weight, setWeight] = useState<number>(70)
  const [height, setHeight] = useState<number>(175)
  const [bmi, setBmi] = useState<number | null>(null)
  const [status, setStatus] = useState<string>("")

  const calculateBMI = () => {
    if (!weight || !height) return

    const bmiValue = weight / ((height / 100) ** 2)
    setBmi(Math.round(bmiValue * 10) / 10)

    if (bmiValue < 18.5) setStatus("Underweight 😕 - Try to eat more balanced meals.")
    else if (bmiValue < 24.9) setStatus("Normal ✅ - Keep maintaining your lifestyle!")
    else if (bmiValue < 29.9) setStatus("Overweight ⚠️ - Consider healthier diet & activity.")
    else setStatus("Obese 🚨 - Please consult a doctor or nutritionist.")
  }

  return (
    <div className=" flex items-center justify-center mt-15  p-6">
      <div className=" w-full bg-gray-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-orange-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-red-400 rounded-full opacity-30 blur-3xl"></div>

        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 drop-shadow-md">
          BMI Calculator
        </h1>

        <div className="space-y-4 text-white">
          {/* Weight */}
          <div className="flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <User className="w-5 h-5 mr-3 text-orange-500" />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full outline-none"
            />
          </div>

          {/* Height */}
          <div className="flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <Ruler className="w-5 h-5 mr-3 text-orange-500" />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300"
        >
          Calculate
        </button>

        {bmi && (
          <div className="mt-6 p-4 bg-gray-700 rounded-xl text-center shadow-inner animate-fadeIn">
            <p className="text-lg font-medium text-gray-300">Your BMI:</p>
            <p className="text-2xl font-bold text-orange-600">{bmi}</p>
            <p className="mt-2 text-gray-100">{status}</p>
          </div>
        )}
      </div>
    </div>
  )
}
