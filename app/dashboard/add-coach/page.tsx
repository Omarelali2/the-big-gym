"use client"

import { useState, useEffect } from "react"
import { addCoachAction, getWorkoutTypesAction } from "@/lib/action"
import toast from "react-hot-toast"
import Image from "next/image"

export default function CoachPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [degree, setDegree] = useState("")
  const [experience, setExperience] = useState("")
  const [about, setAbout] = useState("")
  const [fees, setFees] = useState("")
  const [address, setAddress] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [workoutId, setWorkoutId] = useState("")
  const [workoutTypes, setWorkoutTypes] = useState<
    { id: string; name: string }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const result = await getWorkoutTypesAction()
        if (result.success) setWorkoutTypes(result.workoutTypes ?? [])
        else console.error("Failed to fetch workout types:", result.error)
      } catch (_err) {
        toast.error("Error occurred")
      }
    }
    fetchWorkoutTypes()
  }, [])

  useEffect(() => {
    if (image) setImagePreview(URL.createObjectURL(image))
    else setImagePreview(null)
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await addCoachAction({
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: { full: address },
        date: Number(date),
        image: image || undefined,
        workoutId: workoutId || undefined,
        available,
      })
      if (result.success) {
        toast.success("Coach added successfully!")
        setName("")
        setEmail("")
        setPassword("")
        setSpeciality("")
        setDegree("")
        setExperience("")
        setAbout("")
        setFees("")
        setAddress("")
        setDate("")
        setImage(null)
        setWorkoutId("")
        setAvailable(true)
      } else {
        toast.error(result.error || "Something went wrong")
      }
    } catch (err) {
      toast.error("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' flex items-center justify-center p-5'>
      <div className='bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[86vh]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-red-500'>
          Add Coach
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='text'
            placeholder='Speciality'
            value={speciality}
            onChange={e => setSpeciality(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='text'
            placeholder='Degree'
            value={degree}
            onChange={e => setDegree(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='text'
            placeholder='Experience'
            value={experience}
            onChange={e => setExperience(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <textarea
            placeholder='About'
            value={about}
            onChange={e => setAbout(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            rows={3}
            required
          />

          <input
            type='text'
            placeholder='Fees'
            value={fees}
            onChange={e => setFees(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='number'
            placeholder='Date (timestamp)'
            value={date}
            onChange={e => setDate(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <select
            value={workoutId}
            onChange={e => setWorkoutId(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            <option value=''>-- Select Workout Type --</option>
            {workoutTypes.map(w => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
              className='accent-red-500'
            />
            <label>Available</label>
          </div>

          <div>
            <input
              type='file'
              accept='image/*'
              onChange={e =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className='w-full'
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt='Preview'
                width={400}
                height={112}
                className='mt-2 w-full object-cover rounded-lg border'
              />
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-red-500 hover:bg-red-600 transition-all duration-200 px-6 py-3 rounded-xl font-bold mt-2'
          >
            {loading ? "Adding..." : "Add Coach"}
          </button>
        </form>
      </div>
    </div>
  )
}
