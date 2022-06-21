import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    get: getAllCompanies,
    post: createCompany,
});


async function getAllCompanies(req, res) {
   
    let x = await companyRepo.findAll()

    return res.status(200).json(x);
}

async function createCompany(req, res) {
    const body = JSON.parse(req.body)

    if (!body.content) throw 'No company details provided'

    const {
        guid,
        apiKey,
        syncOnAir,
        name,
        identifier,
    } = body.content

    const x = {
        guid: (guid) ? guid : undefined,
        apiKey: (apiKey) ? apiKey : undefined,
        syncOnAir: syncOnAir,
        name: name,
        identifier: identifier,
    }

    console.log('createCompany()', x)
    let company = await companyRepo.create(x)

    console.log(company)

    return res.status(200).json(company)
}