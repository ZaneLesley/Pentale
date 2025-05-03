/*
  Warnings:

  - You are about to drop the column `Image` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT;
