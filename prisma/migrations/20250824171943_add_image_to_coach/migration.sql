/*
  Warnings:

  - You are about to drop the column `bio` on the `Coach` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Coach" DROP COLUMN "bio",
ADD COLUMN     "about" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "address" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "date" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "degree" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'temp@example.com',
ADD COLUMN     "experience" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "fees" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'changeme',
ADD COLUMN     "slotsBooked" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "speciality" TEXT NOT NULL DEFAULT 'N/A';

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "public"."Coach"("email");
