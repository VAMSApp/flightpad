-- AlterTable
ALTER TABLE "company" ADD COLUMN     "worldId" INTEGER;

-- CreateTable
CREATE TABLE "world" (
    "id" SERIAL NOT NULL,
    "isSurvival" BOOLEAN NOT NULL DEFAULT false,
    "isHumanOnly" BOOLEAN NOT NULL DEFAULT false,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "enableEconomicBalance" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "world_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "world_uuid_key" ON "world"("uuid");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "world"("id") ON DELETE SET NULL ON UPDATE CASCADE;
