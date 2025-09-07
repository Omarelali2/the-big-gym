"use client"

import { useEffect, useState } from "react"
import { addExerciseAction, getMusclesAction } from "@/lib/action"
import toast from "react-hot-toast"
import Image from "next/image"

export default function AddExercisePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState<File | null>(null)
  const [difficulty, setDifficulty] = useState("Beginner")
  const [duration, setDuration] = useState<number>()
  const [reps, setReps] = useState<number>()
  const [sets, setSets] = useState<number>()
  const [category, setCategory] = useState("")
  const [muscleId, setMuscleId] = useState("")
  const [tags, setTags] = useState("")
  const [equipment, setEquipment] = useState("")
  const [loading, setLoading] = useState(false)

  const [muscles, setMuscles] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const fetchMuscles = async () => {
      const result = await getMusclesAction()
      if (result.success) setMuscles(result.muscles || [])
      else console.error("Failed to fetch muscles:", result.error)
    }
    fetchMuscles()
  }, [])

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages([...images, ...Array.from(e.target.files)])
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setVideo(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag)

    const response = await addExerciseAction({
      title,
      description,
      images,
      video: video ?? undefined,
      difficulty,
      duration,
      reps,
      sets,
      category,
      tags: tagsArray,
      equipment,
      muscleId: muscleId || undefined,
    })

    if (response.success) {
      toast.success("Exercise added successfully!")
      setTitle("")
      setDescription("")
      setImages([])
      setVideo(null)
      setDifficulty("Beginner")
      setDuration(undefined)
      setReps(undefined)
      setSets(undefined)
      setCategory("")
      setMuscleId("")
      setTags("")
      setEquipment("")
    } else {
      toast.error(`Error: ${response.error}`)
    }
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center p-5'>
      <div className='bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[86vh]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-red-500'>
          Add New Exercise
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className='border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900'
          />

          <textarea
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900'
            rows={3}
          />

          <div>
            <label className='block mb-2 font-medium'>Images</label>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={handleImagesChange}
              className='border p-2 rounded-lg bg-gray-900'
            />
            <div className='flex flex-wrap gap-3 mt-3'>
              {images.map((img, idx) => {
                const url = URL.createObjectURL(img)
                return (
                  <div
                    key={idx}
                    className='w-28 h-28 relative border-2 border-gray-600 rounded-lg overflow-hidden'
                  >
                    <Image
                      width={48}
                      height={48}
                      src={url}
                      alt={`preview ${idx}`}
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== idx))
                      }
                      className='absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700'
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label className='block mb-2 font-medium'>Video</label>
            <input
              type='file'
              accept='video/*'
              onChange={handleVideoChange}
              className='border p-2 rounded-lg bg-gray-900'
            />
            {video && (
              <video
                src={URL.createObjectURL(video)}
                controls
                className='w-full h-48 mt-2 rounded-lg border border-gray-600'
              />
            )}
          </div>

          <div>
            <label className='block mb-2 font-medium'>Muscle</label>
            {muscles.length > 0 ? (
              <select
                value={muscleId}
                onChange={e => setMuscleId(e.target.value)}
                className='w-full border border-gray-600 rounded-lg p-3 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
              >
                <option value=''>-- Select Muscle --</option>
                {muscles.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className='text-gray-400 italic'>
                No muscles available. Please add one first.
              </p>
            )}
          </div>

          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
          </select>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <input
              type='number'
              placeholder='Duration (min)'
              value={duration || ""}
              onChange={e => setDuration(Number(e.target.value))}
              className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <input
              type='number'
              placeholder='Reps'
              value={reps || ""}
              onChange={e => setReps(Number(e.target.value))}
              className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <input
              type='number'
              placeholder='Sets'
              value={sets || ""}
              onChange={e => setSets(Number(e.target.value))}
              className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          <input
            type='text'
            placeholder='Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
          />
          <input
            type='text'
            placeholder='Tags (comma separated)'
            value={tags}
            onChange={e => setTags(e.target.value)}
            className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
          />
          <input
            type='text'
            placeholder='Equipment'
            value={equipment}
            onChange={e => setEquipment(e.target.value)}
            className='border border-gray-600 p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
          />

          <button
            type='submit'
            disabled={loading}
            className='bg-red-500 hover:bg-red-600 transition-colors p-3 rounded-lg font-bold text-lg'
          >
            {loading ? "Uploading..." : "Add Exercise"}
          </button>
        </form>
      </div>
    </div>
  )
}
