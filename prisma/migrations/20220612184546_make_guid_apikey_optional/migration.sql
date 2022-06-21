/*
  Warnings:

  - You are about to drop the column `onAirIdentifier` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `onAirName` on the `Company` table. All the data in the column will be lost.
  - Made the column `identifier` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "onAirIdentifier",
DROP COLUMN "onAirName",
ALTER COLUMN "guid" DROP NOT NULL,
ALTER COLUMN "apiKey" DROP NOT NULL,
ALTER COLUMN "identifier" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
