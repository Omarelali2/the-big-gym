/*
  Warnings:

  - The `activityLevel` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `experienceLevel` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fitnessGoal` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "activityLevel",
ADD COLUMN     "activityLevel" TEXT,
DROP COLUMN "experienceLevel",
ADD COLUMN     "experienceLevel" TEXT,
DROP COLUMN "fitnessGoal",
ADD COLUMN     "fitnessGoal" TEXT;

-- DropEnum
DROP TYPE "public"."ActivityLevel";

-- DropEnum
DROP TYPE "public"."ExperienceLevel";

-- DropEnum
DROP TYPE "public"."FitnessGoal";
