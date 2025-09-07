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
    const existingUser = await db.user.findUnique({
      where: { clerkUserId },
    });

    let user;

    if (existingUser) {
      user = await db.user.update({
        where: { clerkUserId },
        data: {
          name,
          username,
          imageUrl,
          selectedPackageId: packageId ?? existingUser.selectedPackageId,
          subscriptionActive: packageId ? true : existingUser.subscriptionActive,
        },
      });
    } else {
      user = await db.user.create({
        data: {
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
    }

    return user;
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
}
