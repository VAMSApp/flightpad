import { apiHandler, omit } from 'helpers/api'
import { aircraftRepo, } from 'repos'

export default apiHandler({
    get: getAllAircraft,
    post: createAircraft,
});


async function getAllAircraft(req, res) {
   
    let x = await aircraftRepo.findAll({
        include: {
            aircraftType: true,
            flights: true,
        }
    })
    return res.status(200).json(x);
}

async function createAircraft(req, res) {
    const body = JSON.parse(req.body)

    if (!body.content) throw 'No company details provided'

    const {
        identifier,
        shortName,
        aircraftTypeId,
    } = body.content

    await aircraftRepo.create({
        identifier,
        shortName,
        aircraftTypeId
    }).then((aircraft) => {
        return res.status(200).json(aircraft)
    })
}