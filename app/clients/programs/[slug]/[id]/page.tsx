"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  deleteReview,
  getExerciseById,
  getExerciseStats,
  getUserByClerkId,
  getCoachesByWorkout,
} from "@/lib/data"
import { Clock, Dumbbell, Activity, Star } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { addExerciseComment } from "@/lib/action"
import toast from "react-hot-toast"
import Image from "next/image"

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
  workoutId?: string | null
  ratings?: ExerciseRating[]
  comments?: ExerciseComment[]
}

type UserReview = {
  userId?: string
  username: string
  userImage?: string
  comment: string
  rating: number
  createdAt: string
}

type ExerciseStatsState = {
  averageRating: number
  numReviews: number
  reviews: UserReview[]
} | null

type User = {
  id: string
  clerkUserId: string
  username?: string | null
  name?: string | null
  imageUrl?: string | null
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
type ExerciseAPIResponse = {
  id: string
  title: string
  description?: string | null
  images?: string[]
  videoUrl?: string | null
  difficulty?: string
  duration?: number | null
  reps?: number | null
  sets?: number | null
  category?: string | null
  tags?: string[]
  equipment?: string | null
  workoutId?: string | null
  ratings?: {
    id: string
    rating: number
    userId?: string | null
    createdAt: Date
  }[]
  comments?: {
    id: string
    content: string
    userId?: string | null
    createdAt: Date
  }[]
}

export default function ExerciseDetailPage() {
  const params = useParams()
  const { user } = useUser()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStats, setLoadingStats] = useState(true)
  const [stats, setStats] = useState<ExerciseStatsState>(null)
  const [dbUser, setDbUser] = useState<User | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)

  // Fetch DB user
  useEffect(() => {
    if (!user) return // إذا ما في user، نوقف الفنكشن

    async function fetchDbUser() {
      try {
        // نأكد إن user موجود
        const userId = user?.id
        if (!userId) return

        const dbUser = await getUserByClerkId(userId)

        if (dbUser) setDbUser(dbUser)
      } catch (err) {
        console.error("Failed to fetch DB user:", err)
      }
    }

    fetchDbUser()
  }, [user])

  // Fetch exercise, stats, and coaches
  useEffect(() => {
    async function fetchData() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) return setLoading(false)

      try {
        // Exercise
        const res = await getExerciseById(id)
        if (res.success && res.exercise) {
          const e: ExerciseAPIResponse = res.exercise
          setExercise({
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
            workoutId: e.workoutId ?? null, // هون صار آمن
            ratings:
              e.ratings?.map(r => ({
                id: r.id,
                rating: r.rating,
                userId: r.userId ?? undefined,
                createdAt: r.createdAt.toISOString(),
              })) ?? [],
            comments:
              e.comments?.map(c => ({
                id: c.id,
                content: c.content,
                userId: c.userId ?? undefined,
                createdAt: c.createdAt.toISOString(),
              })) ?? [],
          })

          // Coaches
          if (e.workoutId) {
            const cRes = await getCoachesByWorkout(e.workoutId)
            if (cRes.success && cRes.coaches) {
              setCoaches(
                cRes.coaches.map(c => ({
                  id: c.id,
                  name: c.name,
                  speciality: c.speciality,
                  degree: c.degree,
                  experience: c.experience,
                  fees: c.fees,
                }))
              )
            }
          }
        }

        // Stats
        const s = await getExerciseStats(id)
        setStats({
          averageRating: s.averageRating,
          numReviews: s.numReviews,
          reviews: s.reviews.map(r => ({
            userId: r.userId,
            username: r.username,
            comment: r.comment ?? "", // هون صار string دائمًا
            rating: r.rating ?? 0, // هون صار number دائمًا
            createdAt: r.createdAt,
          })),
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setLoadingStats(false)
      }
    }
    fetchData()
  }, [params.id])

  const handleSubmit = async () => {
    if (!exercise) return toast.error("Exercise not loaded yet")
    if (!newComment.trim()) return toast.error("Comment cannot be empty")
    if (newRating <= 0) return toast.error("Please provide a rating")
    try {
      const { comment, exerciseRating } = await addExerciseComment({
        userId: user!.id,
        exerciseId: exercise.id,
        content: newComment,
        rating: newRating,
      })

      setExercise(prev => {
        if (!prev) return prev
        return {
          ...prev,
          comments: [
            ...(prev.comments ?? []),
            {
              id: comment.id,
              content: comment.content,
              userId: comment.userId ?? undefined,
              createdAt: comment.createdAt.toISOString(),
            },
          ],
          ratings: [
            ...(prev.ratings ?? []),
            {
              id: exerciseRating.id,
              rating: exerciseRating.rating,
              userId: exerciseRating.userId ?? undefined,
              createdAt: exerciseRating.createdAt.toISOString(),
            },
          ],
        }
      })

      // Update stats
      setStats(prev => {
        if (!prev) return null
        const newReview = {
          userId: dbUser?.id,
          username: dbUser?.username ?? "Anonymous",
          userImage: dbUser?.imageUrl ?? "/placeholder.png",
          comment: comment.content,
          rating: exerciseRating.rating,
          createdAt: comment.createdAt.toISOString(),
        }
        const allRatings = [
          ...(exercise?.ratings ?? []),
          { rating: exerciseRating.rating },
        ]
        const avgRating =
          Math.round(
            (allRatings.reduce((acc, r) => acc + r.rating, 0) /
              allRatings.length) *
              10
          ) / 10
        return {
          ...prev,
          reviews: [...prev.reviews, newReview],
          numReviews: prev.numReviews + 1,
          averageRating: avgRating,
        }
      })

      setNewComment("")
      setNewRating(0)
      toast.success("Comment added successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to add comment")
    }
  }

  if (loading)
    return (
      <div className='flex items-center justify-center mt-20 min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin'></div>
        <span className='ml-4 text-white text-lg font-semibold'>
          Loading...
        </span>
      </div>
    )

  if (!exercise)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg text-gray-300'>Exercise not found</p>
      </div>
    )

  const userHasCommented = exercise?.comments?.some(
    c => c.userId === dbUser?.id
  )

  return (
    <div className='px-6 md:px-16 lg:px-24 mt-15 py-10 min-h-screen rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl shadow-gray-900/80 ring-1 ring-gray-700'>
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
              <Image
                width={48}
                height={48}
                unoptimized
                src={img ?? "/placeholder.png"}
                alt={`${exercise.title}-${idx}`}
                className='w-full h-full object-cover transform hover:scale-105 transition duration-500'
              />
            </div>
          ))}
        </div>
      </div>

      <h1 className='text-5xl md:text-6xl font-extrabold mb-4'>
        {exercise.title}
      </h1>
      <p className='text-gray-300 text-lg mb-10'>{exercise.description}</p>

      {/* Exercise info */}
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

      {/* Stats */}
      <div className='bg-gradient-to-r bg-gray-800 p-6 rounded-3xl shadow-2xl mb-12'>
        <h2 className='text-3xl font-extrabold mb-5 text-white'>Ratings</h2>
        <div className='flex items-center gap-3 mb-4'>
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              className={`w-8 h-8 transition-transform duration-300 ${
                i <= (stats?.averageRating ?? 0)
                  ? "text-white scale-110"
                  : "text-gray-400"
              }`}
            />
          ))}
          <span className='ml-4 text-white font-semibold text-lg'>
            {stats?.averageRating ?? 0} / 5 ({stats?.numReviews ?? 0} reviews)
          </span>
        </div>

        <div className='mt-6'>
          {stats?.reviews.map(r => (
            <div
              key={r.userId + r.createdAt}
              className='bg-gray-700 p-4 rounded-xl mb-4 flex flex-col gap-2'
            >
              <div className='flex items-center gap-4'>
                <p className='font-semibold text-white'>{r.username}</p>
              </div>
              <p className='text-gray-300'>{r.comment}</p>
              <p className='text-yellow-400'>Rating: {r.rating}/5</p>
            </div>
          ))}

          {dbUser && userHasCommented && (
            <button
              className='mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
              onClick={async () => {
                if (!exercise) return toast.error("Exercise not loaded yet")
                try {
                  const res = await deleteReview({
                    userId: dbUser.id,
                    exerciseId: exercise.id,
                  })
                  if (res.deletedComment || res.deletedRating) {
                    toast.success("Review deleted successfully!")
                    setExercise(prev => {
                      if (!prev) return prev
                      return {
                        ...prev,
                        comments: prev.comments?.filter(
                          c => c.userId !== dbUser?.id
                        ),
                        ratings: prev.ratings?.filter(
                          r => r.userId !== dbUser?.id
                        ),
                      }
                    })
                  } else toast.error("No review found to delete")
                } catch (err) {
                  console.error(err)
                  toast.error("Failed to delete review")
                }
              }}
            >
              Delete My Review
            </button>
          )}
        </div>
      </div>

      {/* Add comment */}
      {!userHasCommented && (
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
            onClick={handleSubmit}
            className='mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform'
          >
            Submit
          </button>
        </div>
      )}

      {/* Coaches */}
      {coaches.length > 0 && (
        <div className='bg-gray-800 p-6 rounded-3xl shadow-xl'>
          <h2 className='text-3xl font-bold mb-6'>Coaches</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {coaches.map(c => (
              <div
                key={c.id}
                className='bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center'
              >
                <Image
                  width={100}
                  height={100}
                  src={c.imageUrl ?? "/placeholder.png"}
                  alt={c.name}
                  className='rounded-full mb-4 object-cover w-24 h-24'
                />
                <h3 className='text-white font-semibold'>{c.name}</h3>
                <p className='text-gray-300'>{c.speciality}</p>
                <p className='text-gray-400'>{c.degree}</p>
                <p className='text-yellow-400 font-semibold'>Fees: {c.fees}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
