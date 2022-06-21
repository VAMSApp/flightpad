import { apiHandler, omit } from 'helpers/api'
import { flightRepo, } from 'repos'

export default apiHandler({
    put: hasDeparted
});


async function hasDeparted (req, res) {
    const {
        id,
    } = req.query

    if (!id) throw 'ID is required'
    
    const body = JSON.parse(req.body)

    if (!body.content) throw 'No company details provided'

    const {
        departedAt,
    } = body.content

    let flight = await flightRepo.update(id, {
        departedAt: departedAt,
    })

    return res.status(200).json(flight);
}