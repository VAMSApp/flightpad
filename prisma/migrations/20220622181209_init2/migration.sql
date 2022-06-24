/*
  Warnings:

  - You are about to drop the column `trackOnAirCompany` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `trackOnAirEmployees` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `trackOnAirFleet` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `trackOnAirFlights` on the `company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "trackOnAirCompany",
DROP COLUMN "trackOnAirEmployees",
DROP COLUMN "trackOnAirFleet",
DROP COLUMN "trackOnAirFlights",
ADD COLUMN     "syncOnAirCompany" BOOLEAN DEFAULT false,
ADD COLUMN     "syncOnAirEmployees" BOOLEAN DEFAULT false,
ADD COLUMN     "syncOnAirFleet" BOOLEAN DEFAULT false,
ADD COLUMN     "syncOnAirFlights" BOOLEAN DEFAULT false;
