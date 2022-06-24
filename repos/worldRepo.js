import _ from 'lodash'
import { prisma } from 'db'

export const worldRepo = {
    findAll,
    findById,
    findByUuid,
    delete: _delete,
}

async function findAll(opts) {
    let query = {}

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.world.findMany(query)
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

    return await prisma.world.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findByUuid(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            uuid: uuid
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.world.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

/**
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
    
    return await prisma.world.create(query).then((x) => {
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
    
    return await prisma.world.update(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}
*/

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

    return await prisma.world.delete(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

export default worldRepo