/*
  Warnings:

  - You are about to drop the `_ExerciseCoaches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ExerciseCoaches" DROP CONSTRAINT "_ExerciseCoaches_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ExerciseCoaches" DROP CONSTRAINT "_ExerciseCoaches_B_fkey";

-- DropTable
DROP TABLE "public"."_ExerciseCoaches";
