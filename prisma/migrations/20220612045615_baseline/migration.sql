/*
  Warnings:

  - You are about to drop the `Airport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Runway` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Runway" DROP CONSTRAINT "Runway_airportId_fkey";

-- DropTable
DROP TABLE "Airport";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Runway";
