import { getAllWorkoutTypes } from "@/lib/data"
import Image from "next/image"

export default async function WorkoutTypesPage() {
  const workouts = await getAllWorkoutTypes()

  return (
    <div className='p-6'>
      <h1 className='text-2xl text-white font-bold mb-4'>All Workout Types</h1>

      <table className='min-w-full divide-y divide-gray-200 border shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Coaches</th>
            <th className='px-4 py-2'>Users</th>
            <th className='px-4 py-2'>Muscles</th>
            <th className='px-4 py-2'>Images</th>
            <th className='px-4 py-2'>Created At</th>
            <th className='px-4 py-2'>Updated At</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-200'>
          {workouts.map(w => (
            <tr key={w.id} className='hover:bg-gray-50 transition-colors'>
              <td className='px-4 py-2 font-medium'>{w.name}</td>
              <td className='px-4 py-2'>{w.description || "-"}</td>
              <td className='px-4 py-2'>{w.coaches.length}</td>
              <td className='px-4 py-2'>{w.users.length}</td>
              <td className='px-4 py-2'>
                {w.muscle.map(m => m.name).join(", ") || "-"}
              </td>
              <td className='px-4 py-2'>
                {w.images.length > 0 ? (
                  <div className='flex gap-2'>
                    {w.images.map((img, i) => (
                      <Image
                        width={48}
                        height={48}
                        key={i}
                        src={img}
                        alt={w.name}
                        className='w-10 h-10 rounded-lg object-cover'
                      />
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className='px-4 py-2'>
                {new Date(w.createdAt).toLocaleDateString()}
              </td>
              <td className='px-4 py-2'>
                {new Date(w.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
