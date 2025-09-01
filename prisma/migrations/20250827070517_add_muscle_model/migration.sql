/*
  Warnings:

  - You are about to drop the column `muscleGroup` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "muscleGroup",
ADD COLUMN     "muscleId" TEXT,
ADD COLUMN     "subMuscleId" TEXT;

-- CreateTable
CREATE TABLE "public"."Muscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "iconUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubMuscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "muscleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubMuscle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Muscle_slug_key" ON "public"."Muscle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubMuscle_slug_key" ON "public"."SubMuscle"("slug");

-- AddForeignKey
ALTER TABLE "public"."SubMuscle" ADD CONSTRAINT "SubMuscle_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "public"."Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "public"."Muscle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_subMuscleId_fkey" FOREIGN KEY ("subMuscleId") REFERENCES "public"."SubMuscle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
