-- DropForeignKey
ALTER TABLE "Finding" DROP CONSTRAINT "Finding_hypothesisId_fkey";

-- AlterTable
ALTER TABLE "Finding" ALTER COLUMN "hypothesisId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_hypothesisId_fkey" FOREIGN KEY ("hypothesisId") REFERENCES "Hypothesis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
