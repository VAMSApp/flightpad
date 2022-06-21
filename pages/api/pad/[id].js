import { apiHandler, omit } from 'helpers/api'
import { padRepo, } from 'repos'

export default apiHandler({
    get: getPadById,
    delete: deletePadById,
});


async function getPadById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let pad = await padRepo.findById(id, { include: {
        world: true,
        flights: true,
        fleet: true,
    }})

    return res.status(200).json(pad);
}

async function deletePadById(req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    let pad = await padRepo.delete(id)

    return res.status(200).json(pad)
}