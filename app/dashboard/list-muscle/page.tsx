import MusclesPage from "@/components/MusclesPage"
import { getAllMuscles } from "@/lib/data"

export default async function MusclesPageWrapper() {
  const muscles = (await getAllMuscles()).map(m => ({
    ...m,
    description: m.description ?? undefined,
    imageUrl: m.imageUrl ?? undefined,
    iconUrl: m.iconUrl ?? undefined,
    workout: m.workout
      ? {
          ...m.workout,
          description: m.workout.description ?? undefined,
          images: m.workout.images ?? [],
        }
      : null,
    exercises: m.exercises.map(e => ({
      ...e,
      description: e.description ?? undefined,
      imageUrl: e.images?.[0] ?? undefined,
    })),
  }))

  return <MusclesPage initialMuscles={muscles} />
}
