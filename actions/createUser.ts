import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient();

export async function createUserAction({
  clerkUserId,
  email,
  name,
  imageUrl,
}: {
  clerkUserId: string;
  email: string;
  name?: string;
  imageUrl?: string;
}) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name,
        imageUrl,
      },
      create: {
        clerkUserId,
        email,
        name,
        imageUrl,
        subscriptionActive: true,
        isAdmin: email === "elaliomar30@gmail.com@example.com", 
      },
    });

    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
}
