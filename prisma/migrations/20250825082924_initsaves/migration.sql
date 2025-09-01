/*
  Warnings:

  - You are about to drop the column `price` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Package" DROP COLUMN "price",
ADD COLUMN     "annualPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "monthlyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
