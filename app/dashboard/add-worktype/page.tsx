"use client"

import { useState, useEffect } from "react"
import { addWorkoutTypeAction } from "@/lib/action"
import toast from "react-hot-toast"

export default function WorkoutTypePage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  useEffect(() => {
    const previews = images.map(img => URL.createObjectURL(img))
    setImagePreviews(previews)

    return () => previews.forEach(url => URL.revokeObjectURL(url))
  }, [images])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await addWorkoutTypeAction({ name, description, images })
      if (result.success) {
        toast.success("Workout Type added successfully!")
        setName("")
        setDescription("")
        setImages([])
      } else {
        toast.error("Error: " + (result.error || "Something went wrong"))
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center p-5'>
      <div className='bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[86vh]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-red-500'>
          Add Workout Type
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Workout Type Name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <textarea
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            rows={3}
          />

          <div>
            <label className='block font-medium mb-2'>Images</label>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={e =>
                setImages(e.target.files ? Array.from(e.target.files) : [])
              }
              className='border border-gray-600 rounded-lg p-3 bg-gray-900 w-full'
            />
            {imagePreviews.length > 0 && (
              <div className='flex flex-wrap gap-3 mt-3'>
                {imagePreviews.map((url, idx) => (
                  <div
                    key={idx}
                    className='w-28 h-28 relative border-2 border-gray-600 rounded-lg overflow-hidden'
                  >
                    <img
                      src={url}
                      alt={`preview ${idx}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-red-500 hover:bg-red-600 transition-all duration-200 px-6 py-3 rounded-xl font-bold mt-2'
          >
            {loading ? "Adding..." : "Add Workout Type"}
          </button>
        </form>
      </div>
    </div>
  )
}
