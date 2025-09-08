import { db } from "@/lib/db";

export async function createUserAction({
  clerkUserId,
  email,
  name,
  username,
  imageUrl,
  packageId,
}: {
  clerkUserId: string;
  email: string;
  name?: string;
  username: string;
  imageUrl?: string;
  packageId?: number;
}) {
  try {
    const user = await db.user.upsert({
      where: { clerkUserId },
      update: {
        name,
        username,
        imageUrl,
        selectedPackageId: packageId ?? undefined,
        subscriptionActive: packageId ? true : false,
      },
      create: {
        clerkUserId,
        email,
        name,
        username,
        imageUrl,
        selectedPackageId: packageId ?? undefined,
        subscriptionActive: packageId ? true : false,
        isAdmin: email === "elaliomar30@gmail.com",
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
}
