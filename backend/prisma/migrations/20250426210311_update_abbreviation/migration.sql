/*
  Warnings:

  - Added the required column `abbreviation` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "abbreviation" TEXT NOT NULL;
