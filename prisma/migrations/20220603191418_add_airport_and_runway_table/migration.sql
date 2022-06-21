-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "icao" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runway" (
    "id" SERIAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    "Guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "magneticHeading" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "hasIls" BOOLEAN NOT NULL DEFAULT false,
    "ilsFrequency" DECIMAL(65,30) NOT NULL,
    "ilsId" TEXT NOT NULL,
    "ilsSlope" DECIMAL(65,30) NOT NULL,
    "ilsMagneticHeading" INTEGER NOT NULL,
    "thresholdElevation" DECIMAL(65,30) NOT NULL,
    "surfaceType" INTEGER NOT NULL,
    "runwayType" INTEGER NOT NULL,
    "approachLights" TEXT NOT NULL,
    "endLights" BOOLEAN NOT NULL,
    "centerLights" INTEGER NOT NULL,
    "edgeLights" INTEGER NOT NULL,

    CONSTRAINT "Runway_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_Guid_key" ON "Airport"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");

-- CreateIndex
CREATE UNIQUE INDEX "Runway_Guid_key" ON "Runway"("Guid");

-- AddForeignKey
ALTER TABLE "Runway" ADD CONSTRAINT "Runway_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
