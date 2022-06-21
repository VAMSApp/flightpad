/*
  Warnings:

  - You are about to drop the column `airlineICAO` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "flight_flightnumber_seq";
ALTER TABLE "Flight" DROP COLUMN "airlineICAO",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ALTER COLUMN "flightNumber" SET DEFAULT nextval('flight_flightnumber_seq');
ALTER SEQUENCE "flight_flightnumber_seq" OWNED BY "Flight"."flightNumber";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "syncOnAir" BOOLEAN NOT NULL DEFAULT false,
    "onAirName" TEXT,
    "onAirIdentifier" TEXT,
    "identifier" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_guid_key" ON "Company"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Company_apiKey_key" ON "Company"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_identifier_key" ON "Company"("identifier");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
