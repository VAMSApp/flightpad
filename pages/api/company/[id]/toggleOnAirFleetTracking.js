import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    put: toggleOnAirTrackFleet,
});


async function toggleOnAirTrackFleet(req, res) {
    const {
        id,
    } = req.query
    
    if (!id) throw 'ID is required'
    let company = await companyRepo.toggle_trackOnAirFleet(id)

    return res.status(200).json(company)
}
