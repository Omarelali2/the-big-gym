"use server"
import { currentUser } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcrypt"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface CloudinaryUploadResult {
  secure_url: string
  [key: string]: unknown
}

export async function addWorkoutTypeAction({
  name,
  description,
  images,
  coachIds,
  userIds,
}: {
  name: string
  description?: string
  images?: (File | string)[]
  coachIds?: string[]
  userIds?: string[]
}) {
  try {
    let uploadedImages: string[] = []

    if (images && images.length > 0) {
      const uploadPromises = images.map(async img => {
        if (img instanceof File) {
          const arrayBuffer = await img.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          const uploadResult = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "workout-types" },
                (error, result) => {
                  if (error) reject(error)
                  else resolve(result as CloudinaryUploadResult)
                }
              )
              stream.end(buffer)
            }
          )

          return uploadResult.secure_url
        }

        if (typeof img === "string") {
          const uploadResult = await cloudinary.uploader.upload(img, {
            folder: "workout-types",
          })
          return uploadResult.secure_url
        }

        return null
      })

      uploadedImages = (await Promise.all(uploadPromises)).filter(
        (url): url is string => url !== null
      )
    }

    const workoutType = await db.workoutType.create({
      data: {
        name,
        description,
        images: uploadedImages,
        coaches: coachIds
          ? { connect: coachIds.map(id => ({ id })) }
          : undefined,

        users: userIds ? { connect: userIds.map(id => ({ id })) } : undefined,
      },
    })

    return { success: true, workoutType }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function getUserSubscription(clerkUserId: string) {
  const user = await db.user.findUnique({
    where: { clerkUserId },
    select: {
      subscriptionActive: true,
      isAdmin: true,
    },
  })

  return {
    subscriptionActive: user?.subscriptionActive ?? false,
    isAdmin: user?.isAdmin ?? false,
  }
}

export async function addCoachAction({
  name,
  email,
  password,
  image,
  speciality,
  degree,
  experience,
  about,
  fees,
  address,
  date,
  workoutId,
  available = true,
}: {
  name: string
  email: string
  password: string
  image?: File | string
  speciality: string
  degree: string
  experience: string
  about: string
  fees: string
  address?: { full: string } // ✅ هنا الصلاحية تصحيح النوع
  date: number
  workoutId?: string
  available?: boolean
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    let uploadedImageUrl: string | undefined = undefined
    if (image) {
      if (image instanceof File) {
        const arrayBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise<CloudinaryUploadResult>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "coaches" },
              (error, result) => {
                if (error) reject(error)
                else resolve(result as CloudinaryUploadResult)
              }
            )
            stream.end(buffer)
          }
        )
        uploadedImageUrl = uploadResult.secure_url

        uploadedImageUrl = uploadResult.secure_url
      }

      if (typeof image === "string") {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "coaches",
        })
        uploadedImageUrl = uploadResult.secure_url
      }
    }

    const coach = await db.coach.create({
      data: {
        name,
        email,
        password: hashedPassword,
        imageUrl: uploadedImageUrl ?? "",
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
        date,
        workoutId,
        available,
        slotsBooked: {},
      },
    })

    return { success: true, coach }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function getWorkoutTypesAction() {
  try {
    const workoutTypes = await db.workoutType.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, workoutTypes }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function addPackageAction({
  name,
  description,
  features,
  monthlyPrice,
  annualPrice,
  currency = "USD",
  isPayment = false,
  discount = 0,
  offerActive = false,
}: {
  name: string
  description?: string
  features: string[]
  monthlyPrice: number
  annualPrice: number
  currency?: string
  isPayment?: boolean
  discount?: number
  offerActive?: boolean
}) {
  try {
    if (isPayment) {
      return { success: false, error: "Cannot add package: isPayment is true" }
    }
    const finalMonthlyPrice =
      discount > 0
        ? monthlyPrice - (monthlyPrice * discount) / 100
        : monthlyPrice

    const finalAnnualPrice =
      discount > 0 ? annualPrice - (annualPrice * discount) / 100 : annualPrice

    const newPackage = await db.package.create({
      data: {
        name,
        description,
        features,
        monthlyPrice: finalMonthlyPrice,
        annualPrice: finalAnnualPrice,
        currency,
        isPayment,
        discount,
        offerActive,
      },
    })

    return { success: true, package: newPackage }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function addExerciseAction({
  title,
  description,
  images,
  video,
  difficulty = "Beginner",
  duration,
  reps,
  sets,
  category,
  tags = [],
  equipment,
  muscleId,
}: {
  title: string
  description?: string
  images?: (File | string)[]
  video?: File | string
  difficulty?: string
  duration?: number
  reps?: number
  sets?: number
  category?: string
  tags?: string[]
  equipment?: string
  muscleId?: string
}) {
  try {
    // رفع الصور
    let uploadedImages: string[] = []

    if (images && images.length > 0) {
      const uploadPromises = images.map(async img => {
        if (img instanceof File) {
          const buffer = Buffer.from(await img.arrayBuffer())
          const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "exercises/images" },
                (err, res) =>
                  err ? reject(err) : resolve(res as CloudinaryUploadResult)
              )
              stream.end(buffer)
            }
          )
          return result.secure_url
        } else {
          const result = await cloudinary.uploader.upload(img, {
            folder: "exercises/images",
          })
          return result.secure_url
        }
      })

      uploadedImages = await Promise.all(uploadPromises)
    }

    // رفع الفيديو
    let uploadedVideoUrl: string | undefined

    if (video) {
      if (video instanceof File) {
        const buffer = Buffer.from(await video.arrayBuffer())
        const result = await new Promise<CloudinaryUploadResult>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "exercises/videos", resource_type: "video" },
              (err, res) =>
                err ? reject(err) : resolve(res as CloudinaryUploadResult)
            )
            stream.end(buffer)
          }
        )
        uploadedVideoUrl = result.secure_url
      } else {
        const result = await cloudinary.uploader.upload(video, {
          folder: "exercises/videos",
          resource_type: "video",
        })
        uploadedVideoUrl = result.secure_url
      }
    }

    // إنشاء التمرين في قاعدة البيانات
    const exercise = await db.exercise.create({
      data: {
        title,
        description,
        images: uploadedImages,
        videoUrl: uploadedVideoUrl,
        difficulty,
        duration,
        reps,
        sets,
        category,
        tags,
        equipment,
        muscleId,
      },
    })

    return { success: true, exercise }
  } catch (error) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error adding exercise:", message)
    return { success: false, error: message }
  }
}

export async function getMusclesAction() {
  try {
    const muscles = await db.muscle.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    })
    return { success: true, muscles }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}
export async function addMuscleWithSubMuscles(data: {
  name: string
  slug: string
  description?: string
  imageFile?: File
  iconFile?: File
  workoutId?: string
}) {
  try {
    let imageUrl: string | undefined
    if (data.imageFile) {
      const buffer = Buffer.from(await data.imageFile.arrayBuffer())
      const res = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "muscles" },
            (err, result) =>
              err ? reject(err) : resolve(result as { secure_url: string })
          )
          stream.end(buffer)
        }
      )
      imageUrl = res.secure_url
    }

    let iconUrl: string | undefined
    if (data.iconFile) {
      const buffer = Buffer.from(await data.iconFile.arrayBuffer())
      const res = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "muscles/icons" },
            (err, result) =>
              err ? reject(err) : resolve(result as { secure_url: string })
          )
          stream.end(buffer)
        }
      )
      iconUrl = res.secure_url
    }

    const muscle = await db.muscle.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        imageUrl,
        iconUrl,
        workoutId: data.workoutId,
      },
    })

    return { success: true, muscle }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error adding muscle:", message)
    return { success: false, error: message }
  }
}

export async function sendMessage(coachId: string, text: string) {
  if (!coachId) throw new Error("coachId is required")
  if (!text) throw new Error("text is required")

  const user = await currentUser()
  if (!user) throw new Error("Unauthorized")

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } })
  if (!dbUser) throw new Error("User not found")

  let chat = await db.chat.findFirst({ where: { userId: dbUser.id, coachId } })

  if (!chat) {
    chat = await db.chat.create({ data: { userId: dbUser.id, coachId } })
  }

  const message = await db.message.create({
    data: { chatId: chat.id, text, sender: "USER" },
  })

  return {
    id: message.id,
    text: message.text ?? "",
    sender: "USER",
    createdAt: message.createdAt.toISOString(),
  }
}

export async function getChatMessages(coachId: string) {
  const user = await currentUser()
  if (!user) throw new Error("Unauthorized")

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } })
  if (!dbUser) throw new Error("User not found")

  const chat = await db.chat.findFirst({
    where: { userId: dbUser.id, coachId },
    include: { messages: true },
  })

  return (
    chat?.messages.map(msg => ({
      id: msg.id,
      text: msg.text ?? "",
      sender: msg.sender === "USER" ? "USER" : "COACH",
      createdAt: msg.createdAt.toISOString(),
    })) || []
  )
}
export async function coachLoginAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const coach = await db.coach.findUnique({ where: { email } })
  if (!coach) return { success: false, message: "Coach not found" }

  const match = await bcrypt.compare(password, coach.password)
  if (!match) return { success: false, message: "Invalid password" }

  return { success: true, coachId: coach.id, coachName: coach.name }
}

export async function sendMessageFromCoach(
  userId: string,
  coachId: string,
  text: string
) {
  if (!userId || !coachId || !text) throw new Error("Missing parameters")

  const dbCoach = await db.coach.findUnique({ where: { id: coachId } })
  if (!dbCoach) throw new Error("Coach not found")

  let chat = await db.chat.findFirst({ where: { userId, coachId } })
  if (!chat) {
    chat = await db.chat.create({ data: { userId, coachId } })
  }

  const message = await db.message.create({
    data: { chatId: chat.id, text, sender: "COACH" },
  })

  return {
    id: message.id,
    text: message.text ?? "",
    sender: "COACH",
    createdAt: message.createdAt.toISOString(),
  }
}

export async function getCoachChatsAction(coachId: string) {
  if (!coachId) return { success: false, message: "CoachId missing" }

  const chats = await db.chat.findMany({
    where: { coachId },
    include: { user: true, messages: true },
    orderBy: { updatedAt: "desc" },
  })
  type Message = {
    id: string
    text: string | null
    sender: "USER" | "COACH"
    createdAt: string
  }

  type UserChat = {
    id: string
    userId: string
    userName: string
    userImage?: string
    lastMessage?: string
    messages: Message[]
  }
  const formattedChats: UserChat[] = chats.map(chat => ({
    id: chat.id,
    userId: chat.user.id,
    userName: chat.user.name || "Unknown User",
    userImage: chat.user.imageUrl || "/images/default-user.png",
    lastMessage: chat.messages[chat.messages.length - 1]?.text || "",
    messages: chat.messages.map(msg => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender === "USER" ? "USER" : "COACH",
      createdAt: msg.createdAt.toISOString(),
    })),
  }))

  return { success: true, chats: formattedChats }
}

export type FitnessData = {
  height?: number
  weight?: number
  bodyFat?: number
  muscleMass?: number
  activityLevel?: string
  fitnessGoal?: string
  experienceLevel?: string
}

const validActivityLevels = [
  "Sedentary",
  "Light",
  "Moderate",
  "Active",
  "VeryActive",
]
const validFitnessGoals = ["LoseWeight", "GainMuscle", "Maintain", "Endurance"]
const validExperienceLevels = ["Beginner", "Intermediate", "Advanced"]

function sanitizeActivityLevel(value?: string): string | undefined {
  if (!value) return undefined
  return validActivityLevels.includes(value) ? value : undefined
}

function sanitizeFitnessGoal(value?: string): string | undefined {
  if (!value) return undefined
  return validFitnessGoals.includes(value) ? value : undefined
}

function sanitizeExperienceLevel(value?: string): string | undefined {
  if (!value) return undefined
  return validExperienceLevels.includes(value) ? value : undefined
}
export async function saveUserFitnessData(data: FitnessData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const updateData: Partial<{
    height: number
    weight: number
    bodyFat: number
    muscleMass: number
    activityLevel: string
    fitnessGoal: string
    experienceLevel: string
  }> = {}

  if (data.height) updateData.height = Number(data.height)
  if (data.weight) updateData.weight = Number(data.weight)
  if (data.bodyFat) updateData.bodyFat = Number(data.bodyFat)
  if (data.muscleMass) updateData.muscleMass = Number(data.muscleMass)

  if (data.activityLevel) updateData.activityLevel = data.activityLevel
  if (data.fitnessGoal) updateData.fitnessGoal = data.fitnessGoal
  if (data.experienceLevel) updateData.experienceLevel = data.experienceLevel

  await db.user.update({
    where: { clerkUserId: userId },
    data: updateData,
  })

  return { success: true }
}

import OpenAI from "openai"

export async function getCaloriesAdvice(intake: number, burned: number) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt = `You are a fitness advisor AI. A user consumed ${intake} calories and burned ${burned} calories today. Give short, friendly advice.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful fitness AI." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 60,
    })

    return (
      completion.choices[0].message.content?.trim() ||
      "✅ Your calories look balanced."
    )
  } catch (err) {
    console.error(err)
    return "⚠️ Unable to generate advice right now."
  }
}

type UpdateUserInput = Partial<{
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
  subscriptionActive: boolean
  isAdmin: boolean
  selectedWorkoutId: string
}>

export async function updateUserAction(
  clerkUserId: string,
  data: UpdateUserInput
) {
  const existingUser = await db.user.findUnique({ where: { clerkUserId } })
  if (!existingUser) throw new Error("User not found")

  const updatedUser = await db.user.update({
    where: { clerkUserId },
    data,
  })

  return updatedUser
}

interface AddCommentInput {
  userId: string
  exerciseId: string
  content: string
  rating?: number
}

export async function addExerciseComment({
  userId,
  exerciseId,
  content,
  rating,
}: AddCommentInput) {
  if (rating === undefined || rating <= 0) {
    throw new Error("Rating is required and must be greater than 0")
  }

  let user = await db.user.findUnique({ where: { clerkUserId: userId } })
  if (!user) {
    user = await db.user.create({
      data: { clerkUserId: userId, email: "user-email@example.com" },
    })
  }

  const exercise = await db.exercise.findUnique({ where: { id: exerciseId } })
  if (!exercise) throw new Error("Exercise does not exist")

  const existingComment = await db.exerciseComment.findFirst({
    where: { exerciseId, userId: user.id },
  })
  if (existingComment) {
    throw new Error("You have already submitted a comment for this exercise")
  }

  const comment = await db.exerciseComment.create({
    data: { content, exerciseId, userId: user.id },
  })

  const exerciseRating = await db.exerciseRating.create({
    data: { rating, exerciseId, userId: user.id },
  })

  return { comment, exerciseRating }
}
