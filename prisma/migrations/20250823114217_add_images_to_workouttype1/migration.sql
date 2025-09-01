/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `WorkoutType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutType_name_key" ON "public"."WorkoutType"("name");
