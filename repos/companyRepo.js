import _ from 'lodash'
import { prisma } from 'db'

export const companyRepo = {
    findAll,
    findByGuid,
    findByICAO,
    findById,
    create,
    trackOnAirCompany,
    trackOnAirFleet,
    trackOnAirFlights,
    trackOnAirEmployees,
    update,
    delete: _delete
}


async function findAll(opts) {
    let query = {}

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.company.findMany(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findById(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.company.findUnique(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}


async function findByGuid (guid, opts) {
    if (!guid) throw 'No GUID provided'

    let query = {
        where: {
            guid: guid
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }
    
    return await prisma.company.findUnique(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })

}

async function findByICAO (icao, opts) {
    if (!icao) throw 'No ICAO provided'

    let query = {
        where: {
            identifier: icao
        }
    }

    if (opts.include) {
        query.include = opts.include
    }

    return await prisma.company.findUnique(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })

}


async function create(data, opts) {
    if (!data) throw 'No data provided'
    data = (typeof data === 'string') ? JSON.parse(data) : data

    console.log('companyRepo::create()::data', data)
    
    let query = {
        data: {
            uuid: data.uuid,
            apiKey: data.apiKey,
            identifier: data.identifier,
            name: data.name,
            syncOnAirCompany: data.trackOnAirCompany,
            syncOnAirFleet: data.trackOnAirFleet,
            syncOnAirFlights: data.trackOnAirFlights,
            syncOnAirEmployees: data.trackOnAirEmployees,
            world: {
                connect: {
                    id: data.worldId
                }
            }
        },
    }

    if (opts?.include) {
        query.include = include
    }

    console.log('companyRepo::create()::query', query)

    return await prisma.company.create(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function update(id, data, opts) {
    if (!id) throw 'No ID provided'
    if (!data) throw 'Nothing being updated'

    let x = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        where: { id: (typeof id !== 'number') ? parseInt(id) : id },
        data: {
            uuid: data.guid,
            apiKey: data.apiKey,
            identifier: data.identifier,
            name: data.name,
            syncOnAirCompany: data.trackOnAirCompany,
            syncOnAirFleet: data.trackOnAirFleet,
            syncOnAirFlights: data.trackOnAirFlights,
            syncOnAirEmployees: data.trackOnAirEmployees,
            updatedAt: new Date(),
        },
    }

    if (opts?.include) {
        query.include = include
    }

    return await prisma.company.update(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function trackOnAirCompany(id, opts) {
    if (!id) throw 'No ID provided'
    let x = await findById(id)

    x = await update(x.id, {
        ...x,
        trackOnAirCompany: !x.trackOnAirCompany
    }, opts)

    return x
}

async function trackOnAirFleet(id, opts) {
    if (!id) throw 'No ID provided'
    let x = await findById(id)

    x = await update(x.id, {
        ...x,
        trackOnAirFleet: !x.trackOnAirFleet
    }, opts)

    return x
}

async function trackOnAirFlights(id, opts) {
    if (!id) throw 'No ID provided'
    let x = await findById(id)

    x = await update(x.id, {
        ...x,
        trackOnAirFlights: !x.trackOnAirFlights
    }, opts)

    return x
}

async function trackOnAirEmployees(id, opts) {
    if (!id) throw 'No ID provided'
    let x = await findById(id)

    x = await update(x.id, {
        ...x,
        trackOnAirEmployees: !x.trackOnAirFleet
    }, opts)

    return x
}




async function _delete(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        }
    }

    if (opts?.include) {
        query.include = include
    }

    return await prisma.company.delete(query)
    .then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

export default companyRepo