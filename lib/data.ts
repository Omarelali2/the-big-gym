// data.ts
"use server"
import { db } from "@/lib/db"

export async function getAllCoaches() {
  try {
    const coaches = await db.coach.findMany({
      include: {
        workout: true,
        chats: true,
      },
    })
    return coaches
  } catch (error) {
    console.error("Error fetching coaches:", error)
    throw new Error("Failed to fetch coaches")
  }
}
export async function getAllWorkouts() {
  try {
    return await db.workoutType.findMany({
      include: {
        coaches: true,
      },
    })
  } catch (error) {
    console.error("Error fetching workouts:", error)
    return []
  }
}
export async function getPackagesAction() {
  try {
    const packages = await db.package.findMany({
      orderBy: { createdAt: "desc" },
    })

    return { success: true, packages }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}
export async function getAllExercises() {
  try {
    const exercises = await db.exercise.findMany({
      include: {
        comments: true,
        ratings: true,
        favoritedBy: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return exercises
  } catch (error) {
    console.error("Error fetching exercises:", error)
    throw new Error("Failed to fetch exercises")
  }
}
export async function getMuscles() {
  try {
    const muscles = await db.muscle.findMany({
      include: {
        exercises: true,
      },
      orderBy: { createdAt: "desc" },
    })
    return { success: true, muscles }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}
export async function getExercisesByMuscleAction(muscleId: string) {
  try {
    const exercises = await db.exercise.findMany({
      where: { muscleId },
      select: {
        id: true,
        title: true,
        images: true,
      },
    })

    return { success: true, exercises }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function getMuscleById(id: string) {
  try {
    const muscle = await db.muscle.findUnique({
      where: { id },
    })

    if (!muscle) {
      return { success: false, error: "Muscle not found" }
    }

    return { success: true, muscle }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}
export async function getExerciseById(id: string) {
  try {
    const exercise = await db.exercise.findUnique({
      where: { id },
      include: {
        comments: true,
        ratings: true,
      },
    })

    if (!exercise) {
      return { success: false, exercise: null }
    }

    return { success: true, exercise }
  } catch (err) {
    console.error("Error fetching exercise by ID:", err)
    return { success: false, exercise: null }
  }
}
export async function getCoachById(id: string) {
  try {
    const coach = await db.coach.findUnique({
      where: { id },
      include: { workout: true },
    })

    if (!coach) return { success: false, coach: null }

    return {
      success: true,
      coach: {
        id: coach.id,
        name: coach.name,
        email: coach.email,
        imageUrl: coach.imageUrl,
        speciality: coach.speciality,
        degree: coach.degree,
        experience: coach.experience,
        about: coach.about,
        fees: coach.fees,
        workoutId: coach.workoutId,
        workout: coach.workout
          ? { id: coach.workout.id, name: coach.workout.name }
          : null,
      },
    }
  } catch (error) {
    console.error("Error fetching coach by id:", error)
    return { success: false, coach: null }
  }
}

export async function getCoachesByWorkout(workoutId: string) {
  try {
    const coaches = await db.coach.findMany({
      where: {
        workoutId: workoutId,
        available: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        speciality: true,
        degree: true,
        experience: true,
        about: true,
        fees: true,
        address: true,
        slotsBooked: true,
        workoutId: true,
      },
    })

    return { success: true, coaches }
  } catch (error) {
    console.error("Failed to get coaches:", error)
    return { success: false, coaches: [] }
  }
}
export async function getCoachChatsAction(coachId: string) {
  try {
    const chats = await db.chat.findMany({
      where: { coachId },
      include: {
        user: true,
        messages: true,
      },
      orderBy: { createdAt: "asc" },
    })

    const formattedChats = chats.map(chat => ({
      id: chat.id,
      userName: chat.user.name,
      userImage: chat.user.imageUrl || "",
      messages: chat.messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender,
        createdAt: msg.createdAt.toISOString(),
      })),
    }))

    return { success: true, chats: formattedChats }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function getProfile(clerkUserId: string) {
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId },
      include: {
        selectedWorkout: true,
        chats: true,
        exerciseComments: true,
        exerciseRatings: true,
        favoriteExercises: true,
        dailyCalories: true,
      },
    })
    console.log(user)

    if (!user) {
      throw new Error("User not found")
    }

    return user
  } catch (err) {
    console.error("❌ getProfile error:", err)
    throw err
  }
}

export async function getMuscleBySlug(slug: string) {
  try {
    const muscle = await db.muscle.findUnique({
      where: { slug },
      include: {
        exercises: true,
      },
    })

    if (!muscle) return { success: false, muscle: null }
    return { success: true, muscle }
  } catch (error) {
    console.error(error)
    return { success: false, muscle: null }
  }
}

type SearchParams = {
  query?: string
  workoutId?: string
  muscleId?: string
}

export async function searchAll(params: SearchParams) {
  const { query, workoutId, muscleId } = params

  const coaches = await db.coach.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
      ...(workoutId ? { workoutId } : {}),
    },
    select: {
      id: true,

      name: true,
      imageUrl: true,
      fees: true,
    },
  })

  const exercises = await db.exercise.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
      ...(muscleId ? { muscleId } : {}),
    },
    select: {
      id: true,
      title: true,
      images: true,
    },
  })

  const muscles = await db.muscle.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
      ...(workoutId ? { workoutId } : {}),
    },
    select: {
      id: true,
      slug: true,
      name: true,
      imageUrl: true,
    },
  })

  const workouts = await db.workoutType.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    select: {
      id: true,
      name: true,
      images: true,
    },
  })

  return {
    coaches,
    exercises,
    muscles,
    workouts,
  }
}
export type Workout = {
  id: string
  name: string
  description?: string | null
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const workout = await db.workoutType.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        images: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return workout
  } catch (error) {
    console.error("Error fetching workout:", error)
    return null
  }
}

export async function getDashboardStats() {
  try {
    const totalUsers = await db.user.count()
    const totalCoaches = await db.coach.count()
    const totalPackages = await db.package.count()
    const totalExercises = await db.exercise.count()
    const activeSubscribers = await db.user.count({
      where: { subscriptionActive: true },
    })

    const latestUsers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        selectedPackage: {
          select: { id: true, name: true },
        },
      },
    })

    const latestCoaches = await db.coach.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        speciality: true,
        available: true,
      },
    })

    const avgMonthlyPrice = await db.package.aggregate({
      _avg: { monthlyPrice: true },
    })

    return {
      totalUsers,
      totalCoaches,
      totalPackages,
      totalExercises,
      activeSubscribers,
      latestUsers,
      latestCoaches,
      avgMonthlyPrice: avgMonthlyPrice._avg.monthlyPrice || 0,
    }
  } catch (error) {
    console.error("Dashboard Error:", error)
    throw new Error("Failed to load dashboard stats")
  }
}

export async function updateUser(
  userId: string,
  data: Partial<{
    name: string
    email: string
    imageUrl: string
    subscriptionActive: boolean
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
  }>
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data,
    })
    return updatedUser
  } catch (error) {
    console.error("Update User Error:", error)
    throw new Error("Failed to update user")
  }
}
export async function getAllCoache() {
  try {
    const coaches = await db.coach.findMany({
      include: {
        workout: true,
        chats: true,
      },
    })
    return coaches
  } catch (error) {
    console.error("getAllCoaches error:", error)
    throw new Error("Failed to fetch coaches")
  }
}

export async function getAllPackages() {
  try {
    const packages = await db.package.findMany()
    return packages
  } catch (error) {
    console.error("getAllPackages error:", error)
    throw new Error("Failed to fetch packages")
  }
}

export async function getAllWorkoutTypes() {
  try {
    const workouts = await db.workoutType.findMany({
      include: {
        coaches: true,
        muscle: true,
        users: true,
      },
    })
    return workouts
  } catch (error) {
    console.error("getAllWorkoutTypes error:", error)
    throw new Error("Failed to fetch workout types")
  }
}

export async function getAllMuscles() {
  try {
    const muscles = await db.muscle.findMany({
      include: {
        workout: true,
        exercises: true,
      },
    })
    return muscles
  } catch (error) {
    console.error("getAllMuscles error:", error)
    throw new Error("Failed to fetch muscles")
  }
}

export async function deletePackageAction(id: number) {
  try {
    await db.package.delete({
      where: { id },
    })
    return { success: true }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id },
  })
}

export async function deleteWorkoutType(id: string) {
  return await db.workoutType.delete({
    where: { id },
  })
}

export async function deleteMuscleAction(id: string) {
  try {
    await db.muscle.delete({
      where: { id },
    })
    return { success: true }
  } catch (error: unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    console.error("❌ Error fetching packages:", message)
    return { success: false, error: message, packages: [] }
  }
}

export async function deleteExerciseAction(id: string) {
  try {
    await db.exercise.delete({
      where: { id },
    })
    return { success: true }
  } catch (error: unknown) {
  let message = "Unknown error"
  if (error instanceof Error) message = error.message
  console.error("❌ Error fetching packages:", message)
  return { success: false, error: message, packages: [] }
}
}
export async function deleteCoachAction(id: string) {
  try {
    await db.coach.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
  let message = "Unknown error"
  if (error instanceof Error) message = error.message
  console.error("❌ Error fetching packages:", message)
  return { success: false, error: message, packages: [] }
}
}

export async function toggleUserSubscription(userId: string) {
  try {
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return { success: false, error: "User not found" }
    }

    const newStatus = !user.subscriptionActive

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        subscriptionActive: newStatus,
        selectedPackageId: newStatus ? 1 : null,
      },
    })

    return {
      success: true,
      subscriptionActive: updatedUser.subscriptionActive,
      selectedPackageId: updatedUser.selectedPackageId,
    }
  } catch (error: unknown) {
  let message = "Unknown error"
  if (error instanceof Error) message = error.message
  console.error("❌ Error fetching packages:", message)
  return { success: false, error: message, packages: [] }
}
}

export type UserReview = {
  userId?: string
  username: string
  comment?: string
  rating?: number
  createdAt: string
}

export type ExerciseStats = {
  averageRating: number
  numReviews: number
  reviews: UserReview[]
}

export async function getExerciseStats(
  exerciseId: string
): Promise<ExerciseStats> {
  const exercise = await db.exercise.findUnique({
    where: { id: exerciseId },
    include: {
      comments: {
        include: { user: true }, 
      },
      ratings: true,
    },
  })

  if (!exercise) throw new Error("Exercise not found")

  const comments = exercise.comments ?? []
  const ratings = exercise.ratings ?? []

  const averageRating =
    ratings.length > 0
      ? Math.round(
          (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length) * 10
        ) / 10
      : 0

  const numReviews = comments.length

  const reviews: UserReview[] = comments.map(c => ({
    userId: c.userId ?? undefined,
    username: c.user?.username ?? "Anonymous",
    userImage: c.user?.imageUrl ?? "/placeholder.png", // ✅ هون لازم نحط الصورة
    comment: c.content,
    rating: ratings.find(r => r.userId === c.userId)?.rating ?? 0,
    createdAt: c.createdAt.toISOString(),
  }))

  return { averageRating, numReviews, reviews }
}

interface DeleteReviewInput {
  commentId?: string
  exerciseRatingId?: string
  userId?: string
  exerciseId?: string
}

export async function deleteReview({
  commentId,
  exerciseRatingId,
  userId,
  exerciseId,
}: DeleteReviewInput) {
  try {
    let deletedComment = null
    let deletedRating = null

    if (commentId) {
      deletedComment = await db.exerciseComment.delete({
        where: { id: commentId },
      })
    } else if (userId && exerciseId) {
      deletedComment = await db.exerciseComment.deleteMany({
        where: { userId, exerciseId },
      })
    }

    if (exerciseRatingId) {
      deletedRating = await db.exerciseRating.delete({
        where: { id: exerciseRatingId },
      })
    } else if (userId && exerciseId) {
      deletedRating = await db.exerciseRating.deleteMany({
        where: { userId, exerciseId },
      })
    }

    return { deletedComment, deletedRating }
  } catch (err) {
    console.error("Error deleting review:", err)
    throw new Error("Failed to delete review")
  }
}

export async function getUserByClerkId(clerkUserId: string) {
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId },
    })
    return user
  } catch (err) {
    console.error("Failed to get user by Clerk ID:", err)
    return null
  }
}
