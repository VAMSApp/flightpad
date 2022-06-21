import _ from 'lodash'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const companyRepo = {
    findAll,
    findByGuid,
    findByICAO,
    findById,
    create,
    toggleOnAirSync,
    update,
    delete: _delete
}


async function findAll(opts) {
    return await prisma.company.findMany()
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

    return await prisma.company.findUnique({
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        },
        opts: opts
    })
}


async function findByGuid (guid, opts) {
    if (!guid) throw 'No GUID provided'

    let query = {
        where: {
            guid: guid
        }
    }

    if (opts.include) {
        query.include = opts.include
    }
    
    return await prisma.company.findUnique(query)

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

}


async function create(data, opts) {
    if (!data) throw 'No data provided'
    data = (typeof data === 'string') ? JSON.parse(data) : data

    console.log('companyRepo::create()::data', data)

    let query = {
        data: {
            ...data,
        },
    }

    if (opts?.include) {
        query.include = include
    }

    console.log('companyRepo::create()::query', query)

    return await prisma.company.create(query)
}

async function update(id, data, opts) {
    if (!id) throw 'No ID provided'
    if (!data) throw 'Nothing being updated'

    let x = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        where: { id: (typeof id !== 'number') ? parseInt(id) : id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
    }

    if (opts?.include) {
        query.include = include
    }

    return await prisma.company.update(query)
}

async function toggleOnAirSync(id, opts) {
    if (!id) throw 'No ID provided'
    let x = await findById(id)

    x = await update(x.id, {
        syncOnAir: !x.syncOnAir
    })

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
}

export default companyRepo