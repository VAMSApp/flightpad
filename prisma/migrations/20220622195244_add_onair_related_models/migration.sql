/*
  Warnings:

  - You are about to drop the column `createdAt` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `aircraftType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `aircraftType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aircraftClassId` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airportMinSize` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emptyWeight` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engineTypeId` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightsCount` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelTypeId` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeName` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `aircraftType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "aircraftType_shortName_key";

-- AlterTable
ALTER TABLE "aircraftType" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "shortName",
DROP COLUMN "updatedAt",
ADD COLUMN     "aircraftClassId" INTEGER NOT NULL,
ADD COLUMN     "aircraftClassUuid" TEXT,
ADD COLUMN     "airportMinSize" INTEGER NOT NULL,
ADD COLUMN     "basePrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "designSpeedVC" DECIMAL(65,30),
ADD COLUMN     "designSpeedVS0" DECIMAL(65,30),
ADD COLUMN     "designSpeedVS1" DECIMAL(65,30),
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "emptyWeight" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "engineTypeId" INTEGER NOT NULL,
ADD COLUMN     "estimatedCruiseFF" DECIMAL(65,30),
ADD COLUMN     "flightsCount" INTEGER NOT NULL,
ADD COLUMN     "fuelTotalCapacityInGallons" DECIMAL(65,30),
ADD COLUMN     "fuelTypeId" INTEGER NOT NULL,
ADD COLUMN     "hightimeAirframe" DECIMAL(65,30),
ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFighter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maximumCargoWeight" DECIMAL(65,30),
ADD COLUMN     "maximumGrossWeight" DECIMAL(65,30),
ADD COLUMN     "maximumRangeInHour" DECIMAL(65,30),
ADD COLUMN     "maximumRangeInNM" DECIMAL(65,30),
ADD COLUMN     "needsCopilot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numberOfEngines" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "seats" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "standardSeatWeight" DECIMAL(65,30),
ADD COLUMN     "timeBetweenOverhaul" DECIMAL(65,30),
ADD COLUMN     "typeName" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "engineType" (
    "id" INTEGER NOT NULL,
    "oaId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "fuelType" (
    "id" SERIAL NOT NULL,
    "oAId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "fuelType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aircraftClass" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aircraftClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "engineType_oaId_key" ON "engineType"("oaId");

-- CreateIndex
CREATE UNIQUE INDEX "fuelType_oAId_key" ON "fuelType"("oAId");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftClass_uuid_key" ON "aircraftClass"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftClass_shortName_key" ON "aircraftClass"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftType_uuid_key" ON "aircraftType"("uuid");

-- AddForeignKey
ALTER TABLE "aircraftType" ADD CONSTRAINT "aircraftType_engineTypeId_fkey" FOREIGN KEY ("engineTypeId") REFERENCES "engineType"("oaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraftType" ADD CONSTRAINT "aircraftType_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "fuelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraftType" ADD CONSTRAINT "aircraftType_aircraftClassId_fkey" FOREIGN KEY ("aircraftClassId") REFERENCES "aircraftClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
