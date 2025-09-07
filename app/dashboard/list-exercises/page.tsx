// app/exercises/page.tsx
import ExercisesTable from "@/components/ExercisesPage"
import { getAllExercises } from "@/lib/data"

export default async function ExercisesPage() {
  const exercises = await getAllExercises()

  // حوّل الـ Dates لـ string
  const serializedExercises = exercises.map((ex) => ({
    ...ex,
    createdAt: ex.createdAt.toISOString(),
    updatedAt: ex.updatedAt.toISOString(),
  }))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">All Exercises</h1>
      <ExercisesTable initialExercises={serializedExercises} />
    </div>
  )
}
