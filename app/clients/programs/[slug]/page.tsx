"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getMuscleBySlug } from "@/lib/data"
import { getExerciseStats, ExerciseStats } from "@/lib/data"
import { Star, MessageSquare, Clock, Dumbbell, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
}

type Muscle = {
  id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
  iconUrl?: string | null
  exercises: Exercise[]
}
type RawExercise = {
  id: string
  title: string
  description: string | null
  images: string[]
  videoUrl: string | null
  difficulty: string
  category?: string | null
  equipment?: string | null
  duration?: number | null
  sets?: number | null
  reps?: number | null
}

export default function MuscleDetailPage() {
  const params = useParams()
  const [muscle, setMuscle] = useState<Muscle | null>(null)
  const [loading, setLoading] = useState(true)
  const [exerciseStats, setExerciseStats] = useState<
    Record<string, ExerciseStats>
  >({})

  const normalizeExercise = (ex: RawExercise): Exercise => ({
    id: ex.id,
    title: ex.title,
    description: ex.description ?? null,
    images: ex.images?.length ? ex.images : ["/placeholder.png"],
    videoUrl: ex.videoUrl ?? null,
    difficulty: ex.difficulty ?? "Beginner",
    category: ex.category ?? undefined,
    equipment: ex.equipment ?? undefined,
    duration: ex.duration ?? undefined,
    sets: ex.sets ?? undefined,
    reps: ex.reps ?? undefined,
  })

  useEffect(() => {
    async function fetchMuscleAndStats() {
      if (!params.slug) return
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
      const res = await getMuscleBySlug(slug)

      if (res.success && res.muscle) {
        const m = res.muscle
        const normalizedExercises = (m.exercises as RawExercise[]).map(
          normalizeExercise
        )

        setMuscle({
          id: m.id,
          name: m.name,
          slug: m.slug,
          description: m.description ?? null,
          imageUrl: m.imageUrl ?? null,
          iconUrl: m.iconUrl ?? null,
          exercises: normalizedExercises,
        })

        const stats: Record<string, ExerciseStats> = {}
        await Promise.all(
          normalizedExercises.map(async ex => {
            const data = await getExerciseStats(ex.id)
            stats[ex.id] = data
          })
        )
        setExerciseStats(stats)
      }
      setLoading(false)
    }

    fetchMuscleAndStats()
  }, [params.slug])

  if (loading)
    return (
      <div className='flex items-center justify-center mt-20 min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin'></div>
        <span className='ml-4 text-white text-lg font-semibold'>
          Loading...
        </span>
      </div>
    )

  if (!muscle)
    return (
      <div className='px-6 md:px-12 lg:px-20 py-10 min-h-screen bg-gray-100 flex justify-center items-center'>
        <p className='text-xl font-semibold text-gray-500'>Muscle not found</p>
      </div>
    )

  return (
    <div className='px-6 md:px-12 mt-15 lg:px-20 py-10 min-h-screen'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-extrabold text-white'>{muscle.name}</h1>
        {muscle.description && (
          <p className='mt-4 text-gray-400 max-w-3xl mx-auto'>
            {muscle.description}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {muscle.exercises.map(ex => {
          const stats = exerciseStats[ex.id]
          return (
            <Link
              href={`/clients/programs/${muscle.slug}/${ex.id}`}
              key={ex.id}
              className='rounded-3xl border-2 border-red-700 hover:border-orange-700 shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl'
            >
              <div className='relative w-full h-50 overflow-hidden group'>
                <Image
                  width={48}
                  height={48}
                  src={ex.images[0] ?? "/placeholder.png"}
                  alt={ex.title ?? "Exercise image"}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>

              <div className='p-5 bg-gray-900 text-white flex flex-col justify-between h-70'>
                <div>
                  <h2 className='text-2xl font-bold mb-2'>{ex.title}</h2>
                  <p className='text-gray-300 mb-4 line-clamp-3'>
                    {ex.description ?? "No description available."}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold'>
                      {ex.difficulty}
                    </span>
                    {ex.category && (
                      <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                        {ex.category}
                      </span>
                    )}
                    {ex.equipment && (
                      <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold'>
                        {ex.equipment}
                      </span>
                    )}
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
                          i <= (stats?.averageRating ?? 0)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }
                      />
                    ))}
                    <span className='text-sm text-gray-300 ml-2'>
                      ({stats?.numReviews ?? 0})
                    </span>
                  </div>

                  <div className='flex items-center gap-1 text-gray-300'>
                    <MessageSquare size={16} /> {stats?.reviews.length ?? 0}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
