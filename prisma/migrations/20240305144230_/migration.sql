/*
  Warnings:

  - You are about to drop the column `externalHypothesis` on the `Finding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Finding" DROP COLUMN "externalHypothesis",
ADD COLUMN     "hypothesisText" TEXT;
