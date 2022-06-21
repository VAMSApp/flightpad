import { apiHandler, omit } from 'helpers/api'
import { aircraftRepo, } from 'repos'

export default apiHandler({
    get: getAircraftByIdentifier,
});

async function getAircraftByIdentifier(req, res) {
    const {
        query
    } = req.query

    if (!query) throw 'No query provided'
    
    await aircraftRepo.searchForIdentifier(query, {
        include: {
            aircraftType: true,
        }
    })
    .then((fleet) => {
        return res.status(200).json(fleet);
    })

}