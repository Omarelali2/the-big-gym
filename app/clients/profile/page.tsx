"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getProfile } from "@/lib/data"
import { getCaloriesAdvice, updateUserAction } from "@/lib/action"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Phone,
  MapPin,
  User,
  Heart,
  Dumbbell,
  Target,
  Star,
  BoxIcon,
} from "lucide-react"

type DailyCal = {
  date: string
  intake: number
  burned: number
  advice: string
}

type FormValues = {
  name: string
  phoneNumber: string
  address: string
  bio: string
  height: number
  weight: number
  bodyFat: number
  muscleMass: number
  activityLevel: string
  fitnessGoal: string
  experienceLevel: string
}

export default function ProfilePage() {
  const { user, isSignedIn } = useUser()
  const [profile, setProfile] = useState<any>(null)
  const [dailyCalories, setDailyCalories] = useState<DailyCal[]>([])
  const [editMode, setEditMode] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    phoneNumber: "",
    address: "",
    bio: "",
    height: 0,
    weight: 0,
    bodyFat: 0,
    muscleMass: 0,
    activityLevel: "",
    fitnessGoal: "",
    experienceLevel: "",
  })

  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const data = await getProfile(user.id)
      setProfile(data)

      setFormValues({
        name: data.name ?? "",
        phoneNumber: data.phoneNumber ?? "",
        address: data.address ?? "",
        bio: data.bio ?? "",
        height: data.height ?? 0,
        weight: data.weight ?? 0,
        bodyFat: data.bodyFat ?? 0,
        muscleMass: data.muscleMass ?? 0,
        activityLevel: data.activityLevel ?? "",
        fitnessGoal: data.fitnessGoal ?? "",
        experienceLevel: data.experienceLevel ?? "",
      })

      const stored = localStorage.getItem("dailyCalories")
      if (stored) {
        setDailyCalories(JSON.parse(stored))
      } else {
        const today = new Date().toISOString().split("T")[0]
        const initialData = [{ date: today, intake: 0, burned: 0, advice: "…" }]
        setDailyCalories(initialData)
        localStorage.setItem("dailyCalories", JSON.stringify(initialData))
      }
    }

    loadProfile()
  }, [user])

  const handleChange = (key: keyof FormValues, value: string | number) => {
    setFormValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveProfile = async () => {
    if (!user) return
    try {
      const updated = await updateUserAction(user.id, formValues)
      setProfile(updated)
      setEditMode(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateCalories = async (
    index: number,
    key: "intake" | "burned",
    value: number
  ) => {
    setDailyCalories(prev => {
      const newData = [...prev]
      newData[index] = { ...newData[index], [key]: value, advice: "…" }
      localStorage.setItem("dailyCalories", JSON.stringify(newData))
      return newData
    })

    const d = dailyCalories[index]
    const advice = await getCaloriesAdvice(
      key === "intake" ? value : d.intake,
      key === "burned" ? value : d.burned
    )

    setDailyCalories(prev => {
      const newData = [...prev]
      newData[index] = { ...newData[index], advice }
      localStorage.setItem("dailyCalories", JSON.stringify(newData))
      return newData
    })
  }

  if (!isSignedIn || !user)
    return <p className='p-10 text-center text-red-500'>Sign in first</p>
  if (!profile)
    
    return (
      <div className='flex items-center justify-center mt-20 min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin'></div>
        <span className='ml-4 text-white text-lg font-semibold'>
          Loading...
        </span>
      </div>
    )

  return (
    <div className='max-w-7xl mx-auto p-8 mt-15 space-y-12'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-r from-gray-500 to-gray-600 p-8 rounded-3xl shadow-2xl text-white'>
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            className='w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl'
          />
        ) : (
          <div className='w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-700'>
            {profile.name?.charAt(0) || "U"}
          </div>
        )}

        <div className='flex-1 space-y-2'>
          <h1 className='text-4xl font-extrabold flex items-center gap-2'>
            <User className='w-8 h-8' />{" "}
            
              {profile.username}
            
          </h1>
          <p className='text-lg flex items-center gap-2'>
            <Phone className='w-5 h-5' />{" "}
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <div className='text-center'>
          <button
            onClick={() => (editMode ? handleSaveProfile() : setEditMode(true))}
            className='px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700'
          >
            {editMode ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-gray-800 p-6 rounded-2xl shadow-lg text-white space-y-3'>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <User /> Personal Info
          </h2>
          <p className='flex items-center gap-2'>
            <Phone />{" "}
            {editMode ? (
              <input
                value={formValues.phoneNumber}
                onChange={e => handleChange("phoneNumber", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.phoneNumber ?? "-"
            )}
          </p>
          <p className='flex items-center gap-2'>
            <MapPin />{" "}
            {editMode ? (
              <input
                value={formValues.address}
                onChange={e => handleChange("address", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.address ?? "-"
            )}
          </p>
          <p className='flex items-center gap-2'>
            <BoxIcon />{" "}
            {editMode ? (
              <input
                value={formValues.bio}
                onChange={e => handleChange("bio", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.bio ?? "-"
            )}
          </p>
        </div>

        <div className='bg-gray-800 p-6 rounded-2xl shadow-lg text-white space-y-3'>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Heart /> Body Stats
          </h2>
          <p>
            <span className='font-semibold'>Height:</span>{" "}
            {editMode ? (
              <input
                type='number'
                value={formValues.height}
                onChange={e => handleChange("height", Number(e.target.value))}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.height ?? "-"
            )}{" "}
            cm
          </p>
          <p>
            <span className='font-semibold'>Weight:</span>{" "}
            {editMode ? (
              <input
                type='number'
                value={formValues.weight}
                onChange={e => handleChange("weight", Number(e.target.value))}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.weight ?? "-"
            )}{" "}
            kg
          </p>
          <p>
            <span className='font-semibold'>Body Fat:</span>{" "}
            {editMode ? (
              <input
                type='number'
                value={formValues.bodyFat}
                onChange={e => handleChange("bodyFat", Number(e.target.value))}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.bodyFat ?? "-"
            )}{" "}
            %
          </p>
          <p>
            <span className='font-semibold'>Muscle Mass:</span>{" "}
            {editMode ? (
              <input
                type='number'
                value={formValues.muscleMass}
                onChange={e =>
                  handleChange("muscleMass", Number(e.target.value))
                }
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.muscleMass ?? "-"
            )}{" "}
            kg
          </p>
        </div>

        <div className='bg-gray-800 p-6 rounded-2xl shadow-lg text-white space-y-3'>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Dumbbell /> Activity & Goals
          </h2>
          <p>
            <span className='font-semibold'>Activity Level:</span>{" "}
            {editMode ? (
              <input
                value={formValues.activityLevel}
                onChange={e => handleChange("activityLevel", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.activityLevel ?? "-"
            )}
          </p>
          <p>
            <span className='font-semibold'>Fitness Goal:</span>{" "}
            {editMode ? (
              <input
                value={formValues.fitnessGoal}
                onChange={e => handleChange("fitnessGoal", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.fitnessGoal ?? "-"
            )}
          </p>
          <p>
            <span className='font-semibold'>Experience Level:</span>{" "}
            {editMode ? (
              <input
                value={formValues.experienceLevel}
                onChange={e => handleChange("experienceLevel", e.target.value)}
                className='px-2 py-1 rounded-md text-black'
              />
            ) : (
              profile.experienceLevel ?? "-"
            )}
          </p>
          <p>
            <span className='font-semibold'>Subscription Active:</span>{" "}
            {profile.subscriptionActive ? "✅" : "❌"}
          </p>
          <p>
            <span className='font-semibold'>Admin:</span>{" "}
            {profile.isAdmin ? "✅" : "❌"}
          </p>
          <p>
            <span className='font-semibold flex items-center gap-2'>
              <Star /> Selected Workout:
            </span>{" "}
            {profile.selectedWorkout?.name ?? "-"}
          </p>
        </div>
      </div>

      <div className='bg-gray-900 p-6 rounded-3xl shadow-2xl space-y-6'>
        <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
          <Target /> Daily Calories & AI Advice
        </h2>
        {dailyCalories.map((d, i) => (
          <div
            key={i}
            className='flex flex-col md:flex-row gap-4 items-start md:items-center'
          >
            <span className='w-28 text-white font-medium'>{d.date}</span>
            <input
              type='number'
              value={d.intake ?? ""}
              onChange={e =>
                handleUpdateCalories(i, "intake", Number(e.target.value))
              }
              placeholder='Calories eaten'
              className='border border-gray-600 text-white px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
              type='number'
              value={d.burned ?? ""}
              onChange={e =>
                handleUpdateCalories(i, "burned", Number(e.target.value))
              }
              placeholder='Calories burned'
              className='border border-gray-600 text-white px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-400'
            />
            <div className='bg-gray-800 text-gray-200 px-3 py-2 rounded-md flex-1'>
              {d.advice}
            </div>
          </div>
        ))}

        <div className='w-full h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={dailyCalories}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' stroke='white' />
              <YAxis stroke='white' />
              <Tooltip />
              <Legend />
              <Bar dataKey='intake' name='Calories Consumed' fill='#f87171' />
              <Bar dataKey='burned' name='Calories Burned' fill='#60a5fa' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
