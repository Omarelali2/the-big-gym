// data.ts
"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

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
  } catch (error: any) {
    console.error("❌ Error fetching packages:", error)
    return { success: false, error: error.message, packages: [] }
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
        subMuscles: { include: { exercises: true } }, 
      },
      orderBy: { createdAt: "desc" },
    })
    return { success: true, muscles }
  } catch (error: any) {
    console.error("❌ Error fetching muscles:", error)
    return { success: false, error: error.message, muscles: [] }
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
  } catch (error: any) {
    console.error("❌ Error fetching exercises by muscle:", error)
    return { success: false, error: error.message }
  }
}

export async function getMuscleById(id: string) {
  try {
    const muscle = await db.muscle.findUnique({
      where: { id },
      include: { subMuscles: true, exercises: true },
    })

    if (!muscle) {
      return { success: false, error: "Muscle not found" }
    }

    return { success: true, muscle }
  } catch (error: any) {
    console.error("❌ Error fetching muscle:", error)
    return { success: false, error: error.message }
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
    });

    if (!coach) return { success: false, coach: null };

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
    };
    
  } catch (error) {
    console.error("Error fetching coach by id:", error);
    return { success: false, coach: null };
  }
}

export async function getMuscleBySlug(slug: string) {
  try {
    const muscle = await db.muscle.findUnique({
      where: { slug },
      include: {
        exercises: true,
        subMuscles: {
          include: { exercises: true },
        },
      },
    })

    if (!muscle) return { success: false, muscle: null }
    return { success: true, muscle }
  } catch (error) {
    console.error(error)
    return { success: false, muscle: null }
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
// lib/data.ts
export async function getCoachChatsAction(coachId: string) {
  try {
    // مثال على جلب كل الـ chats يلي مرتبطة بالـ coachId
    const chats = await db.chat.findMany({
      where: { coachId },
      include: {
        user: true, // user info
        messages: true, // كل الرسائل
      },
      orderBy: { createdAt: "asc" },
    });

    // صياغة الداتا لتكون جاهزة للـ frontend
    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      userName: chat.user.name,
      userImage: chat.user.imageUrl || "",
      messages: chat.messages.map((msg) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender, // "USER" أو "COACH"
        createdAt: msg.createdAt.toISOString(),
      })),
    }));

    return { success: true, chats: formattedChats };
  } catch (err: any) {
    console.error("getCoachChatsAction error:", err);
    return { success: false, message: "Failed to fetch chats" };
  }
}


