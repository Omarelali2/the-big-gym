-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "public"."DailyCalories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "burned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyCalories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCalories_userId_date_key" ON "public"."DailyCalories"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."DailyCalories" ADD CONSTRAINT "DailyCalories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
