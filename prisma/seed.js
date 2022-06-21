const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const seedData = {
    aircraftTypes: [
        {
            name: 'Single Engine Propeller',
            shortName: 'SEPL',
        },
        {
            name: 'Single Engine Turbo-Propeller',
            shortName: 'SETL',
        },
    ]
}

async function main(cfg) {
    const {
        seedAircraftTypes,
    } = cfg

    
    if (seedAircraftTypes) {
        let AircraftTypes = [];

        seedData.aircraftTypes.forEach(async function(aT) {
            let aircraftType = await prisma.aircraftType.upsert({
                where: {
                    shortName: aT.shortName
                },
                create: aT,
                update: {},
            })
            
        AircraftTypes.push(aircraftType)

        console.log(`Aircraft Type ${aircraftType.shortName} Upserted`)
    });
    
    }
    
}


main({
    seedAircraftTypes: true
})
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
