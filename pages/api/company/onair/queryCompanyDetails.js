import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'
import onAirService from 'services/onair.service'

export default apiHandler({
    post: queryCompanyDetails,
});


async function queryCompanyDetails(req, res) {
    const {
        content: {
            guid,
            apiKey
        },
    } = JSON.parse(req.body)

    console.log({ guid, apiKey, })

    let x = await onAirService.queryCompanyDetails({ guid, apiKey, })

    return res.status(200).json(x)
}