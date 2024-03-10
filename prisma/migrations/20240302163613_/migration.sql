/*
  Warnings:

  - You are about to drop the column `postId` on the `Response` table. All the data in the column will be lost.
  - Added the required column `findingId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hypothesisId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "postId",
ADD COLUMN     "findingId" TEXT NOT NULL,
ADD COLUMN     "hypothesisId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_hypothesisId_fkey" FOREIGN KEY ("hypothesisId") REFERENCES "Hypothesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_findingId_fkey" FOREIGN KEY ("findingId") REFERENCES "Finding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
