-- DropForeignKey
ALTER TABLE "public"."Coach" DROP CONSTRAINT "Coach_workoutId_fkey";

-- AlterTable
ALTER TABLE "public"."Coach" ALTER COLUMN "workoutId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."WorkoutType" ADD COLUMN     "images" TEXT[];

-- AddForeignKey
ALTER TABLE "public"."Coach" ADD CONSTRAINT "Coach_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."WorkoutType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
