-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "selectedPackageId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_selectedPackageId_fkey" FOREIGN KEY ("selectedPackageId") REFERENCES "public"."Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
