import CoachesTable from "@/components/CoachesTable"
import { getAllCoaches } from "@/lib/data"

export default async function CoachesPage() {
  const coaches = await getAllCoaches()

  const serializedCoaches = coaches.map(coach => ({
    ...coach,
    createdAt: coach.createdAt?.toISOString(),
    updatedAt: coach.updatedAt?.toISOString(),
  }))

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white font-bold mb-6">All Coaches</h1>
      <CoachesTable initialCoaches={serializedCoaches} />
    </div>
  )
}
