import OnAirApi from 'onair-api'

async function queryCompanyDetails({ guid, apiKey, }, opts) {
    if (!guid) throw 'No Company ID GUID provided.'
    if (!apiKey) throw 'No Company API Key provided.'

    const Api = new OnAirApi({
        apiKey: apiKey,
        companyId: guid,
    })

    return await Api.getCompany()
}

export const OnAirService = {
    queryCompanyDetails,
}

export default OnAirService