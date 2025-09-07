"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  deleteReview,
  getExerciseById,
  getExerciseStats,
  getUserByClerkId,
} from "@/lib/data"
import { getCoachesByWorkout } from "@/lib/data"
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
interface User {
  id: string
  clerkUserId: string
  email: string
  username?: string | null
  name?: string | null
  imageUrl?: string | null
  createdAt: Date
  updatedAt: Date
  subscriptionActive: boolean
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

export type UserReview = {
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
  const { user } = useUser()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCoaches, setLoadingCoaches] = useState(true)

  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)

  const [stats, setStats] = useState<ExerciseStatsState>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  const [dbUser, setDbUser] = useState<User | null>(null)

  useEffect(() => {
    if (!user) return

    async function fetchDbUser() {
      try {
        const dbUser = await getUserByClerkId(user!.id)
        if (dbUser) setDbUser(dbUser)
      } catch (err) {
        console.error("Failed to fetch DB user:", err)
      }
    }

    fetchDbUser()
  }, [user])

  useEffect(() => {
    async function fetchStats() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) {
        setLoadingStats(false)
        return
      }

      try {
        const s = await getExerciseStats(id)

        const normalized: ExerciseStatsState = {
          ...s,
          reviews: s.reviews.map(r => ({
            userId: r.userId,
            username: r.username,
            comment: r.comment ?? "",
            rating: r.rating ?? 0,
            createdAt: r.createdAt,
          })),
        }

        setStats(normalized)
      } catch (err) {
        console.error("Error fetching exercise stats:", err)
        setStats(null)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [params.id])

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
          ...(exercise.ratings ?? []),
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
      toast.success("Comment and rating added successfully!")
    } catch (err) {
      console.error("Failed to add comment:", err)
    }
  }

  type RawExerciseFromAPI = {
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

  useEffect(() => {
    async function fetchExerciseAndCoaches() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) {
        setLoading(false)
        setLoadingCoaches(false)
        return
      }

      try {
        const res = await getExerciseById(id)
        if (res.success && res.exercise) {
          const rawExercise: RawExerciseFromAPI = res.exercise

          const normalizedExercise: Exercise = {
            id: rawExercise.id,
            title: rawExercise.title,
            description: rawExercise.description ?? null,
            images: rawExercise.images ?? [],
            videoUrl: rawExercise.videoUrl ?? null,
            difficulty: rawExercise.difficulty ?? "Beginner",
            duration: rawExercise.duration ?? null,
            reps: rawExercise.reps ?? null,
            sets: rawExercise.sets ?? null,
            category: rawExercise.category ?? null,
            tags: rawExercise.tags ?? [],
            equipment: rawExercise.equipment ?? null,
            workoutId: rawExercise.workoutId ?? null,
            ratings:
              rawExercise.ratings?.map(r => ({
                id: r.id,
                rating: r.rating,
                userId: r.userId ?? undefined,
                createdAt: r.createdAt.toISOString(),
              })) ?? [],
            comments:
              rawExercise.comments?.map(c => ({
                id: c.id,
                content: c.content,
                userId: c.userId ?? undefined,
                createdAt: c.createdAt.toISOString(),
              })) ?? [],
          }

          setExercise(normalizedExercise)

          if (normalizedExercise.workoutId) {
            const coachesRes = await getCoachesByWorkout(
              normalizedExercise.workoutId
            )
            if (coachesRes.success && coachesRes.coaches) {
              const normalizedCoaches: Coach[] = coachesRes.coaches.map(c => ({
                id: c.id,
                name: c.name,
                speciality: c.speciality,
                degree: c.degree,
                experience: c.experience,
                fees: c.fees,
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

  const userHasCommented = exercise?.comments?.some(c => c.userId === user?.id)

  {
    !userHasCommented ? (
      <div className='bg-gray-800 p-6 rounded-3xl shadow-xl mb-10'></div>
    ) : (
      <p className='text-yellow-400'>
        You have already submitted a comment for this exercise.
      </p>
    )
  }

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

          {dbUser && exercise?.comments?.some(c => c.userId === dbUser.id) && (
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

                    setStats(prev => {
                      if (!prev) return null
                      const newReviews = prev.reviews.filter(
                        r => r.userId !== dbUser?.id
                      )
                      const allRatings =
                        exercise?.ratings?.filter(
                          r => r.userId !== dbUser?.id
                        ) ?? []
                      const avgRating = allRatings.length
                        ? Math.round(
                            (allRatings.reduce((acc, r) => acc + r.rating, 0) /
                              allRatings.length) *
                              10
                          ) / 10
                        : 0

                      return {
                        ...prev,
                        reviews: newReviews,
                        numReviews: newReviews.length,
                        averageRating: avgRating,
                      }
                    })
                  } else {
                    toast.error("No review found to delete")
                  }
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
    </div>
  )
}
