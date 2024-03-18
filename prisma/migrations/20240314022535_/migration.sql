-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "ResponseToHypothesis_FK";

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "hypothesisId" TEXT;
