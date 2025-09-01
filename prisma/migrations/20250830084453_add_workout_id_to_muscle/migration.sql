/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "workoutId";

-- AlterTable
ALTER TABLE "public"."Muscle" ADD COLUMN     "workoutId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Muscle" ADD CONSTRAINT "Muscle_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."WorkoutType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
