-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "onAirIdentifier" TEXT,
ADD COLUMN     "onAirName" TEXT,
ADD COLUMN     "syncOnAir" BOOLEAN NOT NULL DEFAULT false;
