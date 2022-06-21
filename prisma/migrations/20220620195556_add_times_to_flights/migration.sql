-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "actualArrivedAt" TIMESTAMP(3),
ADD COLUMN     "departedAt" TIMESTAMP(3),
ADD COLUMN     "plannedArrivedAt" TIMESTAMP(3);
