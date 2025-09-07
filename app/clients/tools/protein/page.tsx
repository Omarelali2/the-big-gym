"use client"

import { useState } from "react"

export default function ProteinCalculatorPage() {
  const [weight, setWeight] = useState<number>(70)
  const [goal, setGoal] = useState<"maintain" | "muscle" | "fatLoss">("maintain")
  const [protein, setProtein] = useState<number | null>(null)

  const calculateProtein = () => {
    let proteinIntake = 0
    if (goal === "muscle") {
      proteinIntake = weight * 2 // 2g per kg
    } else if (goal === "fatLoss") {
      proteinIntake = weight * 1.8
    } else {
      proteinIntake = weight * 1.5
    }
    setProtein(Math.round(proteinIntake))
  }

  return (
    <div className="mt-15 flex items-center justify-center p-6">
      <div className=" w-full bg-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6">
        <h1 className="text-3xl font-extrabold text-red-500 mb-4 text-center">
          Protein Intake Calculator
        </h1>

        <p className="text-gray-400 mb-6 text-center">
          Find out how much protein you need daily based on your fitness goals.
        </p>

        <div className="space-y-4 text-white">
          {/* Weight */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              min={1}
              className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Goal */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 font-medium">Goal</label>
            <select
              value={goal}
              onChange={e => setGoal(e.target.value as "maintain" | "muscle" | "fatLoss")}
              className="w-full p-3 border text-black border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="maintain">Maintain Weight</option>
              <option value="muscle">Build Muscle</option>
              <option value="fatLoss">Lose Fat</option>
            </select>
          </div>

          <button
            onClick={calculateProtein}
            className="w-full bg-orange-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:bg-orange-600 transition"
          >
            Calculate
          </button>
        </div>

        {protein && (
          <div className="mt-6 p-6 bg-gray-700 rounded-xl text-center">
            <p className="text-lg font-medium text-red-500">
              Your Daily Protein Intake:
            </p>
            <p className="text-3xl font-bold text-orange-500">{protein} g</p>
            <p className="text-sm text-gray-200 mt-2">
              Adjust your diet to meet this protein target for your goal.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
