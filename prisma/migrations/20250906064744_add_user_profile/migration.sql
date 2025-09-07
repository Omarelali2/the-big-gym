/*
  Warnings:

  - You are about to drop the column `subMuscleId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `SubMuscle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_subMuscleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SubMuscle" DROP CONSTRAINT "SubMuscle_muscleId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "subMuscleId";

-- DropTable
DROP TABLE "public"."SubMuscle";
