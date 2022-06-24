-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "level" INTEGER,
    "checkrideLevel" INTEGER,
    "levelXP" INTEGER,
    "reputation" DECIMAL(65,30),
    "initSync" BOOLEAN DEFAULT false,
    "firstSyncedAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "uuid" TEXT,
    "worlduuid" TEXT,
    "apiKey" TEXT,
    "trackOnAirCompany" BOOLEAN DEFAULT false,
    "trackOnAirFleet" BOOLEAN DEFAULT false,
    "trackOnAirFlights" BOOLEAN DEFAULT false,
    "trackOnAirEmployees" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flight" (
    "id" SERIAL NOT NULL,
    "departureAirport" TEXT NOT NULL,
    "arrivalAirport" TEXT NOT NULL,
    "plannedDepartureTime" TIMESTAMP(3),
    "departedAt" TIMESTAMP(3),
    "arrivedAt" TIMESTAMP(3),
    "plannedArrivalTime" TIMESTAMP(3),
    "flightNumber" SERIAL NOT NULL,
    "airlineICAO" TEXT NOT NULL,
    "companyId" INTEGER,
    "flightPlan" TEXT,
    "cruiseAltitude" TEXT,
    "aircraftId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aircraft" (
    "id" SERIAL NOT NULL,
    "identifier" VARCHAR(6) NOT NULL,
    "shortName" TEXT NOT NULL,
    "aircraftTypeId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aircraftType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aircraftType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airport" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "icao" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "elevation" DECIMAL(65,30) NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runway" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "airportId" INTEGER NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "runway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airportLocations" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "airportdId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "magneticHeading" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "airportLocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_identifier_key" ON "company"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "company_uuid_key" ON "company"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "company_apiKey_key" ON "company"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_identifier_key" ON "aircraft"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftType_shortName_key" ON "aircraftType"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "airport_guid_key" ON "airport"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "airport_icao_key" ON "airport"("icao");

-- CreateIndex
CREATE UNIQUE INDEX "airport_iata_key" ON "airport"("iata");

-- CreateIndex
CREATE UNIQUE INDEX "runway_guid_key" ON "runway"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "airportLocations_guid_key" ON "airportLocations"("guid");

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraft" ADD CONSTRAINT "aircraft_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway" ADD CONSTRAINT "runway_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airportLocations" ADD CONSTRAINT "airportLocations_airportdId_fkey" FOREIGN KEY ("airportdId") REFERENCES "airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
