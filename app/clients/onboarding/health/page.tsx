"use client"

import { useState } from "react"
import { saveUserFitnessData, FitnessData } from "@/lib/action"
import { Loader2 } from "lucide-react"

export default function FitnessFormPage() {
  const [form, setForm] = useState<FitnessData>({
    height: undefined,
    weight: undefined,
    bodyFat: undefined,
    muscleMass: undefined,
    activityLevel: undefined,
    fitnessGoal: undefined,
    experienceLevel: undefined,
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await saveUserFitnessData(form)
      setMessage("Your fitness data has been saved successfully ✅")
    } catch (err: any) {
      setMessage(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold mb-6 text-center">Update Your Fitness Data</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={form.height ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="bodyFat"
          placeholder="Body Fat (%)"
          value={form.bodyFat ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="muscleMass"
          placeholder="Muscle Mass (kg)"
          value={form.muscleMass ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="activityLevel"
          value={form.activityLevel ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Activity Level</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Active">Active</option>
          <option value="VeryActive">Very Active</option>
        </select>

        <select
          name="fitnessGoal"
          value={form.fitnessGoal ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Fitness Goal</option>
          <option value="LoseWeight">Lose Weight</option>
          <option value="GainMuscle">Gain Muscle</option>
          <option value="Maintain">Maintain</option>
          <option value="Endurance">Endurance</option>
        </select>

        <select
          name="experienceLevel"
          value={form.experienceLevel ?? ""}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Save Fitness Data"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  )
}
