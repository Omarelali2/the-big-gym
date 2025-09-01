"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getExerciseById } from "@/lib/data"
import { getCoachesByWorkout } from "@/lib/data"
import { Clock, Dumbbell, Activity, Star } from "lucide-react"

type ExerciseComment = {
  id: string
  content: string
  userId?: string
  createdAt: string
}

type ExerciseRating = {
  id: string
  rating: number
  userId?: string
  createdAt: string
}

type Exercise = {
  id: string
  title: string
  description?: string | null
  images: string[]
  videoUrl?: string | null
  difficulty: string
  duration?: number | null
  reps?: number | null
  sets?: number | null
  category?: string | null
  tags?: string[]
  equipment?: string | null
  workoutId?: string
  ratings?: ExerciseRating[]
  comments?: ExerciseComment[]
}

type Coach = {
  id: string
  name: string
  speciality: string
  degree: string
  experience: string
  fees: string
  imageUrl?: string
}

export default function ExerciseDetailPage() {
  const params = useParams()
  const router = useRouter()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCoaches, setLoadingCoaches] = useState(true)

  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)

  // Load exercise
  useEffect(() => {
    async function fetchExercise() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) {
        setLoading(false)
        return
      }

      const res = await getExerciseById(id)
      setLoading(false)
    }
    fetchExercise()
  }, [params.id])

  // Load coaches for the workout
 useEffect(() => {
  async function fetchExerciseAndCoaches() {
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    if (!id) {
      setLoading(false)
      setLoadingCoaches(false)
      return
    }

    try {
      // جلب الـ exercise
      const res = await getExerciseById(id)
      if (res.success && res.exercise) {
        const e = res.exercise

        // normalization للـ exercise
        const normalizedExercise: Exercise = {
          id: e.id,
          title: e.title,
          description: e.description ?? null,
          images: e.images ?? [],
          videoUrl: e.videoUrl ?? null,
          difficulty: e.difficulty ?? "Beginner",
          duration: e.duration ?? null,
          reps: e.reps ?? null,
          sets: e.sets ?? null,
          category: e.category ?? null,
          tags: e.tags ?? [],
          equipment: e.equipment ?? null,
          workoutId: (e as any).workoutId ?? null, // نضمن وجود workoutId
          ratings:
            e.ratings?.map((r: any) => ({
              id: r.id,
              rating: r.rating,
              userId: r.userId ?? undefined,
              createdAt: r.createdAt
                ? new Date(r.createdAt).toISOString()
                : new Date().toISOString(),
            })) ?? [],
          comments:
            e.comments?.map((c: any) => ({
              id: c.id,
              content: c.content,
              userId: c.userId ?? undefined,
              createdAt: c.createdAt
                ? new Date(c.createdAt).toISOString()
                : new Date().toISOString(),
            })) ?? [],
        }

        setExercise(normalizedExercise)

        // جلب الـ coaches إذا موجود workoutId
        if (normalizedExercise.workoutId) {
          const coachesRes = await getCoachesByWorkout(
            normalizedExercise.workoutId
          )

          if (coachesRes.success && coachesRes.coaches) {
            // normalization للـ coaches لتتوافق مع النوع Coach
            const normalizedCoaches: Coach[] = coachesRes.coaches.map((c: any) => ({
              id: c.id,
              name: c.name,
              speciality: c.speciality,
              degree: c.degree,
              experience: c.experience,
              fees: c.fees,
              imageUrl: c.imageUrl ?? undefined,
            }))
            setCoaches(normalizedCoaches)
          } else {
            setCoaches([])
          }
        } else {
          setCoaches([])
        }
      }
    } catch (error) {
      console.error("Error fetching exercise or coaches:", error)
      setExercise(null)
      setCoaches([])
    } finally {
      setLoading(false)
      setLoadingCoaches(false)
    }
  }

  fetchExerciseAndCoaches()
}, [params.id])

  const handleAddComment = () => {
    if (!newComment || newRating === 0) return

    const comment: ExerciseComment = {
      id: Date.now().toString(),
      content: newComment,
      userId: "currentUserId",
      createdAt: new Date().toISOString(),
    }

    const rating: ExerciseRating = {
      id: Date.now().toString(),
      rating: newRating,
      userId: "currentUserId",
      createdAt: new Date().toISOString(),
    }

    setExercise(prev =>
      prev
        ? {
            ...prev,
            comments: [comment, ...(prev.comments || [])],
            ratings: [rating, ...(prev.ratings || [])],
          }
        : null
    )

    setNewComment("")
    setNewRating(0)
  }

  const getAverageRating = (ratings: ExerciseRating[]) => {
    if (!ratings.length) return 0
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / ratings.length) * 10) / 10
  }

  const handleBookCoach = (coachId: string) => {
    router.push(`/clients/book-coach/${coachId}`)
  }

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg text-gray-300 animate-pulse'>Loading...</p>
      </div>
    )

  if (!exercise)
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <p className='text-lg text-gray-300'>Exercise not found</p>
      </div>
    )

  return (
    <div className='px-6 md:px-16 lg:px-24 py-10 min-h-screen rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl shadow-gray-900/80 ring-1 ring-gray-700'>
      {/* Exercise Media */}
      <div className='flex flex-col md:flex-row gap-6 mb-10'>
        {exercise.videoUrl && (
          <div className='w-full md:w-3/5 h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
            <video
              src={exercise.videoUrl}
              controls
              className='w-full h-full object-cover rounded-3xl'
            />
          </div>
        )}
        <div className='w-full md:w-2/5 flex flex-col gap-4'>
          {exercise.images.map((img, idx) => (
            <div
              key={idx}
              className='h-32 md:h-39 rounded-2xl overflow-hidden shadow-lg'
            >
              <img
                src={img ?? "/placeholder.png"}
                alt={`${exercise.title}-${idx}`}
                className='w-full h-full object-cover transform hover:scale-105 transition duration-500'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Info */}
      <h1 className='text-5xl md:text-6xl font-extrabold mb-4'>
        {exercise.title}
      </h1>
      <p className='text-gray-300 text-lg mb-10'>{exercise.description}</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
        {[
          {
            icon: Activity,
            label: "Difficulty",
            value: exercise.difficulty,
            color: "text-red-400",
          },
          {
            icon: Clock,
            label: "Duration",
            value: exercise.duration ? `${exercise.duration} min` : "N/A",
            color: "text-yellow-400",
          },
          {
            icon: Dumbbell,
            label: "Sets",
            value: exercise.sets ?? "N/A",
            color: "text-green-400",
          },
          {
            icon: Dumbbell,
            label: "Reps",
            value: exercise.reps ?? "N/A",
            color: "text-blue-400",
          },
        ].map((info, idx) => {
          const Icon = info.icon
          return (
            <div
              key={idx}
              className='bg-gray-800 w-full p-5 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1'
            >
              <Icon className={`w-6 h-6 ${info.color} mb-2`} />
              <span className='block text-sm text-gray-400'>{info.label}</span>
              <span className='text-lg font-semibold'>{info.value}</span>
            </div>
          )
        })}
      </div>

      {/* Ratings */}
      <div className='bg-gradient-to-r bg-gray-800 p-6 rounded-3xl shadow-2xl mb-12'>
        <h2 className='text-3xl font-extrabold mb-5 text-white'>Ratings</h2>
        <div className='flex items-center gap-3'>
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              className={`w-8 h-8 transition-transform duration-300 ${
                i <= getAverageRating(exercise.ratings ?? [])
                  ? "text-white scale-110"
                  : "text-gray-400"
              }`}
            />
          ))}
          <span className='ml-4 text-white font-semibold text-lg'>
            {getAverageRating(exercise.ratings ?? [])} / 5 (
            {exercise.ratings?.length || 0} reviews)
          </span>
        </div>
      </div>

      {/* Add Feedback */}
      <div className='bg-gray-800 p-6 rounded-3xl shadow-xl mb-10'>
        <h2 className='text-2xl font-bold mb-4 text-white'>
          Add Your Feedback
        </h2>
        <div className='flex gap-2 mb-4'>
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              onClick={() => setNewRating(i)}
              className={`w-8 h-8 cursor-pointer transition-transform duration-200 ${
                i <= newRating ? "text-yellow-400 scale-110" : "text-gray-600"
              }`}
            />
          ))}
        </div>
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder='Write your comment...'
          className='w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 resize-none'
          rows={4}
        />
        <button
          onClick={handleAddComment}
          className='mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform'
        >
          Submit
        </button>
      </div>

      {/* Coaches */}
      <div className='mt-12'>
        <h2 className='text-3xl font-bold mb-6'>Coaches for this Workout</h2>
        {loadingCoaches ? (
          <p className='text-gray-400'>Loading coaches...</p>
        ) : coaches.length === 0 ? (
          <p className='text-gray-400'>
            No coaches available for this workout.
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {coaches.map(coach => (
              <div
                key={coach.id}
                className='bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col items-center'
              >
                {coach.imageUrl && (
                  <img
                    src={coach.imageUrl}
                    alt={coach.name}
                    className='w-24 h-24 rounded-full mb-3 object-cover'
                  />
                )}
                <h3 className='text-xl font-bold mb-1'>{coach.name}</h3>
                <p className='text-gray-400 text-sm mb-1'>{coach.speciality}</p>
                <p className='text-gray-400 text-sm mb-1'>{coach.degree}</p>
                <p className='text-gray-400 text-sm mb-1'>
                  Experience: {coach.experience}
                </p>
                <p className='text-yellow-400 font-semibold mb-2'>
                  Fees: ${coach.fees}
                </p>
                <button
                  onClick={() => handleBookCoach(coach.id)}
                  className='bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors'
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
