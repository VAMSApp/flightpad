/*
  Warnings:

  - You are about to drop the column `actualArrivedAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `actualDepartedAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `plannedArrivedAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `plannedDepartAt` on the `Flight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "actualArrivedAt",
DROP COLUMN "actualDepartedAt",
DROP COLUMN "plannedArrivedAt",
DROP COLUMN "plannedDepartAt",
ADD COLUMN     "arrivedAt" TIMESTAMP(3),
ADD COLUMN     "departedAt" TIMESTAMP(3),
ADD COLUMN     "plannedArrivalTime" TIMESTAMP(3),
ADD COLUMN     "plannedDepartureTime" TIMESTAMP(3);
