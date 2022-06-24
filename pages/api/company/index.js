import { apiHandler, omit } from 'helpers/api'
import { companyRepo, } from 'repos'

export default apiHandler({
    get: getCompany,
    delete: deleteCompany,
    post: createCompany,
});


async function getCompany(req, res) {
    const {
        id
    } = req.query

    if (!id) throw 'No ID provided'

    let x = await companyRepo.findById(id, {
        stringify: true,
    })

    return res.status(200).json(x);
}

async function deleteCompany(req, res) {
    const {
        id
    } = req.query

    if (!id) throw 'No ID provided'

    let x = await companyRepo.delete(id)

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
        worlduuid,
        worldId,
    } = body.content

    const x = {
        uuid: (guid) ? guid : undefined,
        apiKey: (apiKey) ? apiKey : undefined,
        syncOnAir: syncOnAir,
        name: name,
        identifier: identifier,
        worlduuid: worlduuid,
        worldId: worldId,
    }

    console.log('createCompany()', x)
    
    let company = await companyRepo.create(x)

    console.log(company)

    return res.status(200).json(company)
}