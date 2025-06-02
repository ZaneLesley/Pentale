/*
  Warnings:

  - You are about to drop the column `record` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "record",
ADD COLUMN     "losses" INTEGER,
ADD COLUMN     "wins" INTEGER;
