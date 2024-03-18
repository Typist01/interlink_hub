-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_findingId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_hypothesisId_fkey";

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "findingId" DROP NOT NULL,
ALTER COLUMN "hypothesisId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_hypothesisId_fkey" FOREIGN KEY ("hypothesisId") REFERENCES "Hypothesis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_findingId_fkey" FOREIGN KEY ("findingId") REFERENCES "Finding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
