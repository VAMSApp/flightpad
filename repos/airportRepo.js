import _ from 'lodash'
import { prisma } from 'db'

export const airportRepo = {
    findAll,
    findById,
    searchByICAO,
    searchByIATA,
    create,
    update,
    delete: _delete,
}

async function findAll(opts) {
    let query = {}

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.findMany(query)
    .then((x) => {
        if (opts?.stringify) {
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

    return await prisma.airport.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function searchByICAO(q, opts) {
    if (!q) throw 'No Query provided'
    
    let query = {
        where: {
            icao: {
                contains: q
            }
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.findMany(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function searchByIATA(q, opts) {
    if (!q) throw 'No Query provided'
    
    let query = {
        where: {
            iata: {
                contains: q
            }
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.findMany(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}


async function create(data, opts) {
    if (!data) throw 'No data provided'
    data = (typeof data === 'string') ? JSON.parse(data) : data
    const uuid4RegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

    if (!uuid4RegExp.test(data.guid)) {
        throw 'GUID is not in UUID format'
    }

    let query = {
        data: {
            guid: data.guid,
            icao: data.icao,
            iata: data.iata,
            state: data.state,
            countryCode: data.countryCode,
            city: data.city,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            elevation: parseFloat(data.elevation),
            size: parseInt(data.size),
        },
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.create(query).then((x) => {
        if (opts?.stringify) {
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
            guid: data.guid,
            icao: data.icao,
            iata: data.iata,
            state: data.state,
            countryCode: data.countryCode,
            city: data.city,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            elevation: parseFloat(data.elevation),
            size: parseInt(data.size),
            updatedAt: new Date(),
        },
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.update(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function _delete(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airport.delete(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findAllAirportTypes(opts) {

    let query = {}
    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.airportType.findMany(query).then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findAirportTypeById(id, opts) {
    if (!id) throw 'No ID provided'
    
    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        },
    }
    
    if (opts?.include) {
        query.include = opts.include
    }
    

    return await prisma.airportType.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

export default airportRepo