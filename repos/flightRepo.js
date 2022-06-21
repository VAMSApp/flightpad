import _ from 'lodash'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const flightRepo = {
    findAll,
    findById,
    create,
    update,
    delete: _delete
}

async function findAll(opts) {
    return await prisma.flight.findMany()
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

    return await prisma.flight.findUnique({
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        },
        opts: opts
    })
}

async function create(data, opts) {
    if (!data) throw 'No data provided'
    data = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        data: {
            ...data,
        },
    }

    if (opts?.include) {
        query.include = include
    }

    return await prisma.flight.create(query)
}

async function update(id, data, opts) {
    if (!id) throw 'No ID provided'
    if (!data) throw 'Nothing being updated'

    let x = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        where: { id: (typeof id !== 'number') ? parseInt(id) : id },
        data: {
            departureAirport: x.departureAirport || undefined,
            arrivalAirport: x.arrivalAirport || undefined,
            flightNumber: x.flightNumber || undefined,
            plannedDepartureTime: x.plannedDepartureTime || undefined,
            departedAt: x.departedAt || undefined,
            arrivedAt: x.arrivedAt || undefined,
            plannedArrivalTime: x.plannedArrivalTime || undefined,
            airlineICAO: x.airlineICAO || undefined,
            flightPlan: x.flightPlan || undefined,
            aircraftId: x.aircraftId || undefined,
            updatedAt: new Date(),
        },
    }

    if (opts?.include) {
        query.include = include
    }

    return await prisma.flight.update(query)
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

    return await prisma.flight.delete(query)
}

export default flightRepo