const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const seedData = {
    aircraftClasses: [
        {
            uuid: '243b9470-6fe5-4084-871d-2fc3fc8b2232',
            shortName: 'SEPL',
            name: 'Single Engine Piston Land',
        },
        {
            uuid: 'b4a35db6-f20a-4320-8f0c-ec9956da11a6',
            shortName: 'SETL',
            name: 'Single Engine TurboProp Land'
        },
        {
            uuid: '607d854a-18f7-42ae-99f6-63b4b7f07f1a',
            shortName: 'METL',
            name: 'Multi-engine TurboProp Land'
        },
        {
            uuid: '3460504f-db41-4ea6-a765-2a6867a2f88d',
            shortName: 'JET',
            name: 'Jet'
        },
        {
            uuid: '04422853-db1a-425b-85c8-fdf3fdb54c66',
            shortName: 'HEAVYJET',
            name: 'Heavy Jet'
        },
    ],
    worlds: [
        // bin
        {
            uuid: 'bin',
            name: 'Fail Bin',
            isSurvival: false,
            isHumanOnly: false,
            shortName: 'Fail Bin'
        },

        // cumulus
        {
            uuid: 'ad3ec8a4-246e-4abb-84a9-9dbc43bb6ae6',
            name: 'Cumulus',
            isSurvival: false,
            isHumanOnly: false,
            shortName: 'Cumulus'
        },

        // stratus
        {
            uuid: 'be6ab20f-809f-4c57-aaa6-9e78a3022ba8',
            name: 'Stratus',
            isSurvival: false,
            isHumanOnly: false,
            shortName: 'Stratus'
        },

        // thunder
        {
            uuid: 'c83eb5d5-9dc5-452f-b261-69b45cb0951b',
            name: 'Thunder',
            isSurvival: true,
            isHumanOnly: true,
            shortName: 'Thunder'
        },
    ],
}

function SeedAircraftClasses(aircraftClasses) {
    let AircraftClasses = [];

    aircraftClasses.forEach(async function(aT) {
        let aircraftClass = await prisma.aircraftClass.upsert({
            where: {
                shortName: aT.shortName
            },
            create: aT,
            update: {},
        })
    
        AircraftClasses.push(aircraftClass)

        console.log(`  Aircraft Class ${aircraftClass.shortName} Upserted`)
    });

    return AircraftClasses
}

function SeedWorlds(worlds) {
    let Worlds = [];

    worlds.forEach(async function (w) {
        let world = await prisma.world.upsert({
            where: {
                uuid: w.uuid
            },
            create: w,
            update: {}
        });

        Worlds.push(world);
        console.log(`  World ${world.shortName} Upserted`);
    });


    return Worlds
}

async function main(cfg) {
    const {
        seedAircraftClasses,
        seedWorlds,
    } = cfg
    
    if (seedAircraftClasses) {
        SeedAircraftClasses(seedData.aircraftClasses)
    }

    if (seedWorlds) {
        SeedWorlds(seedData.worlds)
    }
}


main({
    seedAircraftClasses: true,
    seedWorlds: true,
})
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
