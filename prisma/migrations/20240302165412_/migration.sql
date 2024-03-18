/*
  Warnings:

  - You are about to drop the column `findingId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `hypothesisId` on the `Response` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_findingId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_hypothesisId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "findingId",
DROP COLUMN "hypothesisId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "ResponseToHypothesis_FK" FOREIGN KEY ("postId") REFERENCES "Hypothesis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "ResponseToFinding_FK" FOREIGN KEY ("postId") REFERENCES "Finding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
