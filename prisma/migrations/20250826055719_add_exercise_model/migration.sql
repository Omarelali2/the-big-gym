-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "category" TEXT,
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'Beginner',
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "muscleGroup" TEXT,
ADD COLUMN     "reps" INTEGER,
ADD COLUMN     "sets" INTEGER,
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "public"."ExerciseComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExerciseRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ExerciseCoaches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseCoaches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseCoaches_B_index" ON "public"."_ExerciseCoaches"("B");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "public"."_UserFavorites"("B");

-- AddForeignKey
ALTER TABLE "public"."ExerciseComment" ADD CONSTRAINT "ExerciseComment_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExerciseComment" ADD CONSTRAINT "ExerciseComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExerciseRating" ADD CONSTRAINT "ExerciseRating_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExerciseRating" ADD CONSTRAINT "ExerciseRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseCoaches" ADD CONSTRAINT "_ExerciseCoaches_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseCoaches" ADD CONSTRAINT "_ExerciseCoaches_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFavorites" ADD CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFavorites" ADD CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
