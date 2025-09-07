import { db } from "./db";

export async function searchExercises(query: string) {
  const search = query.toLowerCase();

  const exercises = await db.exercise.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
        { muscle: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
    include: {
      muscle: true,
      comments: true,
      ratings: true,
    },
  });

  return exercises;
}
