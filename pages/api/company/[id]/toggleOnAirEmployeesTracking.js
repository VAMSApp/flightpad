import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    put: toggleOnAirTrackEmployees,
});


async function toggleOnAirTrackEmployees(req, res) {
    const {
        id,
    } = req.query
    
    if (!id) throw 'ID is required'
    let company = await companyRepo.toggle_trackOnAirEmployees(id)

    return res.status(200).json(company)
}
