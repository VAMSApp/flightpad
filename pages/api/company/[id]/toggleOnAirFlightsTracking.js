import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    put: toggleOnAirTrackFlights,
});


async function toggleOnAirTrackFlights(req, res) {
    const {
        id,
    } = req.query
    
    if (!id) throw 'ID is required'
    let company = await companyRepo.toggle_trackOnAirFlights(id)

    return res.status(200).json(company)
}
