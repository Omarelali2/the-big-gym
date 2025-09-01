-- CreateEnum
CREATE TYPE "public"."ActivityLevel" AS ENUM ('Sedentary', 'Light', 'Moderate', 'Active', 'VeryActive');

-- CreateEnum
CREATE TYPE "public"."FitnessGoal" AS ENUM ('LoseWeight', 'GainMuscle', 'Maintain', 'Endurance');

-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "activityLevel" "public"."ActivityLevel",
ADD COLUMN     "bodyFat" DOUBLE PRECISION,
ADD COLUMN     "experienceLevel" "public"."ExperienceLevel",
ADD COLUMN     "fitnessGoal" "public"."FitnessGoal",
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "muscleMass" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;
