import { apiHandler, omit } from 'helpers/api'
import { flightRepo, } from 'repos'

export default apiHandler({
    get: getFlightById,
    delete: deleteFlightById,
});

async function getFlightById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let flight = await flightRepo.findById(id)

    return res.status(200).json(flight);
}

async function deleteFlightById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let flight = await flightRepo.delete(id)

    return res.status(200).json(flight)
}