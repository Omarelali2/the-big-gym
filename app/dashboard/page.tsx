import DashboardChart from "@/components/DashboardChart"
import SubscriptionToggle from "@/components/SubscriptionToggle"
import { getDashboardStats } from "@/lib/data"
import {
  Users,
  Dumbbell,
  CreditCard,
  BarChart3,
  Star,
  Package,
} from "lucide-react"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Coaches", value: stats.totalCoaches },
    { name: "Packages", value: stats.totalPackages },
    { name: "Exercises", value: stats.totalExercises },
  ]

  return (
    <div className='p-8 space-y-10'>
      <h1 className='text-3xl font-bold text-white mb-6'>📊 Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <Users className='w-8 h-8 mb-2' />
          <p className='text-sm'>Users</p>
          <p className='text-2xl font-bold'>{stats.totalUsers}</p>
        </div>
        <div className='bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <Dumbbell className='w-8 h-8 mb-2' />
          <p className='text-sm'>Coaches</p>
          <p className='text-2xl font-bold'>{stats.totalCoaches}</p>
        </div>
        <div className='bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <CreditCard className='w-8 h-8 mb-2' />
          <p className='text-sm'>Subscribers</p>
          <p className='text-2xl font-bold'>{stats.activeSubscribers}</p>
        </div>
        <div className='bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <Package className='w-8 h-8 mb-2' />
          <p className='text-sm'>Packages</p>
          <p className='text-2xl font-bold'>{stats.totalPackages}</p>
        </div>
        <div className='bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <Star className='w-8 h-8 mb-2' />
          <p className='text-sm'>Exercises</p>
          <p className='text-2xl font-bold'>{stats.totalExercises}</p>
        </div>
        <div className='bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
          <BarChart3 className='w-8 h-8 mb-2' />
          <p className='text-sm'>Avg Price</p>
          <p className='text-2xl font-bold'>
            ${stats.avgMonthlyPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Overview</h2>
        <DashboardChart data={chartData} />
      </div>

      {/* All Users Section */}
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>All Users Details</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Profile
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  UserName
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Email
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Subscription
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Height (cm)
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Weight (kg)
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Body Fat (%)
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Muscle Mass (kg)
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Activity Level
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Fitness Goal
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Phone
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                  Address
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {stats.latestUsers.map(u => (
                <tr key={u.id}>
                  <td className='px-4 py-2'>
                    <img
                      src={u.imageUrl || "/default-profile.png"}
                      alt={u.name || "User Profile"}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  </td>
                  <td className='px-4 py-2'>{u.username || "No Name"}</td>
                  <td className='px-4 py-2'>{u.email}</td>
                  <td className='px-4 py-2 flex items-center gap-2'>
                    <SubscriptionToggle
                      userId={u.id}
                      initialActive={u.subscriptionActive ?? false}
                    />
                    {u.selectedPackage?.name && (
                      <span className='text-sm text-gray-500'>
                        ({u.selectedPackage.name})
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-2'>{u.height ?? "-"}</td>
                  <td className='px-4 py-2'>{u.weight ?? "-"}</td>
                  <td className='px-4 py-2'>{u.bodyFat ?? "-"}</td>
                  <td className='px-4 py-2'>{u.muscleMass ?? "-"}</td>
                  <td className='px-4 py-2'>{u.activityLevel ?? "-"}</td>
                  <td className='px-4 py-2'>{u.fitnessGoal ?? "-"}</td>
                  <td className='px-4 py-2'>{u.phoneNumber ?? "-"}</td>
                  <td className='px-4 py-2'>{u.address ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Latest Coaches</h2>
        <ul className='divide-y'>
          {stats.latestCoaches.map(c => (
            <li key={c.id} className='py-3 flex justify-between items-center'>
              <div>
                <p className='font-medium'>{c.name}</p>
                <p className='text-gray-500 text-sm'>{c.speciality}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  c.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {c.available ? "Available" : "Busy"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
