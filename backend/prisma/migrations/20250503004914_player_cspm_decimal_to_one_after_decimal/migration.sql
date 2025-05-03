/*
  Warnings:

  - You are about to alter the column `cspm` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,1)`.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "cspm" SET DATA TYPE DECIMAL(10,1);
