import { apiHandler, omit } from 'helpers/api'
import { aircraftRepo, } from 'repos'

export default apiHandler({
    get: getAircraftById,
    delete: deleteAircraftById,
});

async function getAircraftById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let aircraft = await aircraftRepo.findById(id)

    return res.status(200).json(aircraft);
}

async function deleteAircraftById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let aircraft = await aircraftRepo.delete(id)

    return res.status(200).json(aircraft)
}