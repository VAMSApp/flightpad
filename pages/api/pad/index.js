import { apiHandler, omit } from 'helpers/api'
import { padRepo, } from 'repos'

export default apiHandler({
    get: getAllPads,
    post: createPad,
});


async function getAllPads(req, res) {
   
    let pad = await padRepo.findAll()

    return res.status(200).json(pad);
}

async function createPad(req, res) {
    const {
        content,
    } = req.body

    let pad = await padRepo.create(req.body)

    console.log(pad)

    return res.status(200).json(pad)
}