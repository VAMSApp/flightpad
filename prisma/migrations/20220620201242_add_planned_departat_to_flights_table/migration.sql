/*
  Warnings:

  - You are about to drop the column `departedAt` on the `Flight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "departedAt",
ADD COLUMN     "actualDepartedAt" TIMESTAMP(3),
ADD COLUMN     "plannedDepartAt" TIMESTAMP(3);
