import { apiHandler, omit } from 'helpers/api'
import { flightRepo, } from 'repos'

export default apiHandler({
    get: getAllFlights,
    post: createFlight,
});


async function getAllFlights(req, res) {
   
    let x = await flightRepo.findAll()

    return res.status(200).json(x);
}

async function createFlight(req, res) {
    const body = JSON.parse(req.body)

    if (!body.content) throw 'No company details provided'

    const {
        airlineICAO,
        arrivalAirport,
        departureAirport,
        flightNumber,
        flightPlan,
        companyId,
    } = body.content

    await flightRepo.create({
        airlineICAO,
        arrivalAirport,
        departureAirport,
        flightNumber: parseInt(flightNumber),
        flightPlan,
        companyId,
    }).then((flight) => {
        return res.status(200).json(flight)
    })
}