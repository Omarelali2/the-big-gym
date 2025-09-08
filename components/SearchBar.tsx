"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { searchAll } from "@/lib/data"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchResults {
  coaches: {
    id: string
    name: string
    slug: string
    imageUrl?: string | null
  }[]
  exercises: {
    id: string
    title: string
    slug: string
    images: string[]
  }[]
  muscles: {
    id: string
    name: string
    slug: string
    imageUrl?: string | null
  }[]
  workouts: {
    id: string
    name: string
    slug: string
    images: string[]
  }[]
}
interface RawCoach {
  id: string
  name: string
  imageUrl?: string | null
  fees: string
}

interface RawExercise {
  id: string
  title: string
  images: string[]
}

interface RawMuscle {
  id: string
  name: string
  slug: string
  imageUrl?: string | null
}

interface RawWorkout {
  id: string
  name: string
  images: string[]
}

export default function SearchBar({
  onExpand,
  onCollapse,
}: {
  onExpand: () => void
  onCollapse: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    setExpanded(true)
    if (onExpand) onExpand() // ✅ استدعاء الـ callback
  }

  const handleCollapse = () => {
    setExpanded(false)
    if (onCollapse) onCollapse() // ✅ استدعاء الـ callback
  }
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [results, setResults] = useState<SearchResults | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      const data = await searchAll({ query })

      const normalizedData: SearchResults = {
        coaches: data.coaches.map((c: RawCoach) => ({
          id: c.id,
          name: c.name,
          slug: c.id, // او c.slug اذا موجود
          imageUrl: c.imageUrl ?? null,
        })),
        exercises: data.exercises.map((e: RawExercise) => ({
          id: e.id,
          title: e.title,
          slug: e.id,
          images: e.images,
        })),
        muscles: data.muscles.map((m: RawMuscle) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          imageUrl: m.imageUrl ?? null,
        })),
        workouts: data.workouts.map((w: RawWorkout) => ({
          id: w.id,
          name: w.name,
          slug: w.id,
          images: w.images,
        })),
      }

      setResults(normalizedData)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false)
        setResults(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleNavigate = (type: string, slug: string, id: string) => {
    switch (type) {
      case "coach":
        router.push(`/clients/coaching/${id}`)
        break
      case "exercise":
        router.push(`/clients/programs/${slug}/${id}`)
        break
      case "muscle":
        router.push(`/clients/programs/${slug}`)
        break
      case "workout":
        router.push(`/workouts/${id}`)
        break
      default:
        break
    }
    setExpanded(false)
    setResults(null)
  }

  return (
    <div ref={containerRef} className='relative'>
      <div
        className={`flex items-center bg-gray-700 rounded-full px-2 py-3 pl-3.5 transition-all duration-300 ${
          expanded ? "w-[65vw] md:w-[65vw]" : "w-12"
        } cursor-pointer`}
        onClick={handleExpand}
      >
        <Search className='w-5 h-5 text-white' />
        {expanded && (
          <input
            type='text'
            autoFocus
            placeholder='Search...'
            className='bg-transparent focus:outline-none text-white w-full'
            onBlur={handleCollapse}
            onClick={handleExpand} 
          />
        )}
      </div>

      {expanded && results && (
        <div className='absolute top-full left-0 mt-2 w-full max-h-[400px] overflow-y-auto bg-gray-800 rounded-xl shadow-lg z-50 p-4'>
          {loading && <p className='text-gray-300'>Loading...</p>}

          {!loading && (
            <div className='space-y-4'>
              {results.coaches.length > 0 && (
                <div>
                  <h3 className='font-bold text-white mb-2'>Coaches</h3>
                  <div className='space-y-2'>
                    {results.coaches.map((c: SearchResults["coaches"][0]) => (
                      <div
                        key={c.id}
                        onClick={() => handleNavigate("coach", c.slug, c.id)}
                        className='flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md p-2'
                      >
                        {c.imageUrl ? (
                          <Image
                            src={c.imageUrl}
                            alt={c.name}
                            width={40}
                            height={40}
                            className='rounded-full object-cover'
                          />
                        ) : (
                          <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
                            No
                          </div>
                        )}
                        <span className='text-white font-semibold'>
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.exercises.length > 0 && (
                <div>
                  <h3 className='font-bold text-white mb-2'>Exercises</h3>
                  <div className='space-y-2'>
                    {results.exercises.map(
                      (e: SearchResults["exercises"][0]) => (
                        <div
                          key={e.id}
                          onClick={() =>
                            handleNavigate("exercise", e.slug, e.id)
                          }
                          className='flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md p-2'
                        >
                          {e.images.length > 0 ? (
                            <Image
                              src={e.images[0]}
                              alt={e.title}
                              width={40}
                              height={40}
                              className='rounded-full object-cover'
                            />
                          ) : (
                            <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
                              No
                            </div>
                          )}
                          <span className='text-white font-semibold'>
                            {e.title}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {results.muscles.length > 0 && (
                <div>
                  <h3 className='font-bold text-white mb-2'>Muscles</h3>
                  <div className='space-y-2'>
                    {results.muscles.map((m: SearchResults["muscles"][0]) => (
                      <div
                        key={m.id}
                        onClick={() => handleNavigate("muscle", m.slug, m.id)}
                        className='flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md p-2'
                      >
                        {m.imageUrl ? (
                          <Image
                            src={m.imageUrl}
                            alt={m.name}
                            width={40}
                            height={40}
                            className='rounded-full object-cover'
                          />
                        ) : (
                          <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
                            No
                          </div>
                        )}
                        <span className='text-white font-semibold'>
                          {m.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.workouts.length > 0 && (
                <div>
                  <h3 className='font-bold text-white mb-2'>Workouts</h3>
                  <div className='space-y-2'>
                    {results.workouts.map((w: SearchResults["workouts"][0]) => (
                      <div
                        key={w.id}
                        onClick={() => handleNavigate("workout", w.slug, w.id)}
                        className='flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md p-2'
                      >
                        {w.images.length > 0 ? (
                          <Image
                            src={w.images[0]}
                            alt={w.name}
                            width={40}
                            height={40}
                            className='rounded-full object-cover'
                          />
                        ) : (
                          <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
                            No
                          </div>
                        )}
                        <span className='text-white font-semibold'>
                          {w.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
