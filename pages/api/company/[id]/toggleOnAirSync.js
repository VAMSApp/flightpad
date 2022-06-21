import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    put: toggleOnAirSync,
});


async function toggleOnAirSync(req, res) {
    const {
        id,
    } = req.query
    
    if (!id) throw 'ID is required'
    let company = await companyRepo.toggleOnAirSync(id)

    return res.status(200).json(company)
}