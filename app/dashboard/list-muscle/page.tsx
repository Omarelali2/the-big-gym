import MusclesPage from "@/components/MusclesPage"
import { getAllMuscles } from "@/lib/data"

export default async function MusclesPageWrapper() {
  const muscles = await getAllMuscles()
  return <MusclesPage initialMuscles={muscles} />
}
