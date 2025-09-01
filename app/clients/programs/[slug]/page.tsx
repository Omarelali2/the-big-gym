"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getMuscleBySlug } from "@/lib/data"
import {
  Star,
  MessageSquare,
  Clock,
  Dumbbell,
  Activity,
  Award,
  Video,
  Users,
} from "lucide-react"
import Link from "next/link"

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
  difficulty?: string
  category?: string
  equipment?: string
  duration?: number
  sets?: number
  reps?: number
  ratings?: ExerciseRating[]
  comments?: ExerciseComment[]
}

type SubMuscle = {
  id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
  exercises?: Exercise[]
}

type Muscle = {
  id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
  iconUrl?: string | null
  subMuscles: SubMuscle[]
  exercises: Exercise[]
}

export default function MuscleDetailPage() {
  const params = useParams()
  const [muscle, setMuscle] = useState<Muscle | null>(null)
  const [loading, setLoading] = useState(true)

  const normalizeExercise = (ex: any): Exercise => ({
    id: ex.id,
    title: ex.title,
    description: ex.description ?? null,
    images: ex.images?.length ? ex.images : ["/placeholder.png"],
    videoUrl: ex.videoUrl ?? null,
    difficulty: ex.difficulty ?? "Beginner",
    category: ex.category ?? null,
    equipment: ex.equipment ?? null,
    duration: ex.duration ?? null,
    sets: ex.sets ?? null,
    reps: ex.reps ?? null,
    ratings: ex.ratings ?? [],
    comments: ex.comments ?? [],
  })

  const normalizeSubMuscle = (sm: any): SubMuscle => ({
    id: sm.id,
    name: sm.name,
    slug: sm.slug,
    description: sm.description ?? null,
    imageUrl: sm.imageUrl ?? null,
    exercises: sm.exercises?.map(normalizeExercise) ?? [],
  })

  useEffect(() => {
    async function fetchMuscle() {
      if (!params.slug) return
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
      const res = await getMuscleBySlug(slug)

      if (res.success && res.muscle) {
        const m = res.muscle
        setMuscle({
          id: m.id,
          name: m.name,
          slug: m.slug,
          description: m.description ?? null,
          imageUrl: m.imageUrl ?? null,
          iconUrl: m.iconUrl ?? null,
          subMuscles: m.subMuscles?.map(normalizeSubMuscle) ?? [],
          exercises: m.exercises?.map(normalizeExercise) ?? [],
        })
      }
      setLoading(false)
    }
    fetchMuscle()
  }, [params.slug])

  if (loading)
    return (
      <div className='px-6 md:px-12 lg:px-20 py-10 min-h-screen  flex justify-center items-center'>
        <p className='text-xl font-semibold text-white animate-pulse'>
          Loading...
        </p>
      </div>
    )

  if (!muscle)
    return (
      <div className='px-6 md:px-12 lg:px-20 py-10 min-h-screen bg-gray-100 flex justify-center items-center'>
        <p className='text-xl font-semibold text-gray-500'>Muscle not found</p>
      </div>
    )

  const allExercises = [
    ...muscle.exercises,
    ...muscle.subMuscles.flatMap(sm => sm.exercises ?? []),
  ]

  const getAverageRating = (ratings: ExerciseRating[]) => {
    if (!ratings.length) return 0
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / ratings.length) * 10) / 10
  }

  return (
    <div className='px-6 md:px-12 lg:px-20 py-10 min-h-screen '>
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-extrabold text-white'>{muscle.name}</h1>
        {muscle.description && (
          <p className='mt-4 text-gray-400 max-w-3xl mx-auto'>
            {muscle.description}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {allExercises.map(ex => (
          <Link href={`/clients/programs/${muscle.slug}/${ex.id}`}
            key={ex.id}
            className=' rounded-3xl border-2 border-red-700 hover:border-orange-700 shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl'
          >
            <div className='relative w-full h-50 overflow-hidden group'>
              <img
                src={ex.images[0] ?? "/placeholder.png"}
                alt={ex.title ?? "Exercise image"}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
            </div>

            <div className='p-5 bg-gray-900 text-white flex flex-col justify-between h-60'>
              <div>
                <h2 className='text-2xl font-bold mb-2'>{ex.title}</h2>
                <p className='text-gray-300 mb-4 line-clamp-3'>
                  {ex.description ?? "No description available."}
                </p>

                <div className='flex flex-wrap gap-2 mb-3'>
                  {" "}
                  <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold'>
                    {" "}
                    {ex.difficulty}{" "}
                  </span>{" "}
                  {ex.category && (
                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                      {" "}
                      {ex.category}{" "}
                    </span>
                  )}{" "}
                  {ex.equipment && (
                    <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold'>
                      {" "}
                      {ex.equipment}{" "}
                    </span>
                  )}{" "}
                </div>
              </div>
              <div className='flex justify-between text-gray-400 mb-3'>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{ex.duration ? `${ex.duration} min` : "N/A"}</span>
                </div>

                <div className='flex items-center gap-1'>
                  <Dumbbell className='w-4 h-4' />
                  <span>{ex.sets ? `${ex.sets} sets` : "N/A"}</span>
                </div>

                <div className='flex items-center gap-1'>
                  <Users className='w-4 h-4' />
                </div>
              </div>

              <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i <= getAverageRating(ex.ratings ?? [])
                          ? "text-yellow-400"
                          : "text-gray-600 "
                      }
                    />
                  ))}
                  <span className='text-sm text-gray-300 ml-2'>
                    ({ex.ratings?.length || 0})
                  </span>
                </div>

                <div className='flex items-center gap-1 text-gray-300'>
                  <MessageSquare size={16} /> {ex.comments?.length || 0}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
