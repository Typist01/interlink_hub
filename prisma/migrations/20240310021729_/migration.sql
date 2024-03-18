/*
  Warnings:

  - You are about to drop the column `userVote` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "userVote",
ALTER COLUMN "votes" SET DEFAULT 0;
