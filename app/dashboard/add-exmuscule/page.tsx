"use client"

import { useEffect, useState } from "react"
import { addMuscleWithSubMuscles, getWorkoutTypesAction } from "@/lib/action"
import toast from "react-hot-toast"

interface SubMuscleInput {
  name: string
  slug: string
  description?: string
  imageFile?: File
}

interface MuscleInput {
  name: string
  slug: string
  description?: string
  imageFile?: File
  iconFile?: File
  workoutId?: string
  subMuscles?: SubMuscleInput[]
}

export default function AddMusclePage() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [subMuscles, setSubMuscles] = useState<SubMuscleInput[]>([])
  const [workoutId, setWorkoutId] = useState("")
  const [workoutTypes, setWorkoutTypes] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)

  const handleAddSubMuscle = () => {
    setSubMuscles([...subMuscles, { name: "", slug: "" }])
  }

  const handleSubMuscleChange = (index: number, field: keyof SubMuscleInput, value: string | File) => {
    const updated = [...subMuscles]
    if (field === "imageFile" && value instanceof File) {
      updated[index][field] = value
    } else if (field !== "imageFile") {
      updated[index][field] = value as string
    }
    setSubMuscles(updated)
  }

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      const result = await getWorkoutTypesAction()
      if (result.success) setWorkoutTypes(result.workoutTypes)
      else console.error("Failed to fetch workout types:", result.error)
    }
    fetchWorkoutTypes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const muscleData: MuscleInput = {
      name,
      slug,
      description,
      imageFile: imageFile ?? undefined,
      iconFile: iconFile ?? undefined,
      workoutId,
      subMuscles: subMuscles.map(s => ({
        name: s.name,
        slug: s.slug,
        description: s.description,
        imageFile: s.imageFile,
      })),
    }

    const res = await addMuscleWithSubMuscles(muscleData)

    if (res.success) {
      toast.success("Muscle added successfully!")
      setName("")
      setSlug("")
      setDescription("")
      setImageFile(null)
      setIconFile(null)
      setSubMuscles([])
      setWorkoutId("")
    } else {
      toast.error(`Error: ${res.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center p-5">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[86vh]">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Add New Muscle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Basic Fields */}
          <input type="text" placeholder="Muscle Name" value={name} onChange={e => setName(e.target.value)} required className="border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="text" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} required className="border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500" rows={3} />

          <div>
            <label className="block mb-2">Main Image</label>
            <input type="file" accept="image/*" onChange={e => e.target.files && setImageFile(e.target.files[0])} className="border p-2 rounded-lg bg-gray-900 w-full" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Workout Type</label>
            {workoutTypes.length > 0 ? (
              <select value={workoutId} onChange={e => setWorkoutId(e.target.value)} className="w-full border border-gray-600 rounded-lg p-3 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">-- Select Workout Type --</option>
                {workoutTypes.map(w => (<option key={w.id} value={w.id}>{w.name}</option>))}
              </select>
            ) : (
              <p className="text-gray-400 italic">No workout types available. Please add one first.</p>
            )}
          </div>

          <div>
            <label className="block mb-2">Icon Image</label>
            <input type="file" accept="image/*" onChange={e => e.target.files && setIconFile(e.target.files[0])} className="border p-2 rounded-lg bg-gray-900 w-full" />
          </div>

          <h2 className="text-xl font-semibold mt-4">Sub Muscles</h2>
          {subMuscles.map((sub, index) => (
            <div key={index} className="border border-gray-600 p-3 rounded-lg flex flex-col gap-2">
              <input type="text" placeholder="Sub Muscle Name" value={sub.name} onChange={e => handleSubMuscleChange(index, "name", e.target.value)} className="border border-gray-600 p-2 rounded-lg bg-gray-900" />
              <input type="text" placeholder="Slug" value={sub.slug} onChange={e => handleSubMuscleChange(index, "slug", e.target.value)} className="border border-gray-600 p-2 rounded-lg bg-gray-900" />
              <textarea placeholder="Description" value={sub.description || ""} onChange={e => handleSubMuscleChange(index, "description", e.target.value)} className="border border-gray-600 p-2 rounded-lg bg-gray-900" rows={2} />
              <input type="file" accept="image/*" onChange={e => e.target.files && handleSubMuscleChange(index, "imageFile", e.target.files[0])} className="border p-2 rounded-lg bg-gray-900" />
            </div>
          ))}
          <button type="button" onClick={handleAddSubMuscle} className="bg-gray-700 hover:bg-gray-600 transition-colors p-2 rounded-lg font-semibold mt-2">+ Add Sub Muscle</button>

          <button type="submit" disabled={loading} className="bg-red-500 hover:bg-red-600 transition-colors p-3 rounded-lg font-bold text-lg mt-4">
            {loading ? "Uploading..." : "Add Muscle"}
          </button>
        </form>
      </div>
    </div>
  )
}
