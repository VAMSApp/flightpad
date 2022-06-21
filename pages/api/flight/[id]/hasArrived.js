import { apiHandler, omit } from 'helpers/api'
import { flightRepo, } from 'repos'

export default apiHandler({
    put: hasArrived
});


async function hasArrived (req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    const body = JSON.parse(req.body)

    if (!body.content) throw 'No company details provided'

    const {
        arrivedAt,
    } = body.content

    let flight = await flightRepo.update(id, {
        arrivedAt: arrivedAt,
    })

    return res.status(200).json(flight);
}