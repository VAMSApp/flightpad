import _flightRepo from './flightRepo'
import _companyRepo from './companyRepo'
import _aircraftRepo from './aircraftRepo'
import _worldRepo from './worldRepo'
import _airportRepo from './airportRepo'

export const flightRepo = _flightRepo
export const companyRepo = _companyRepo
export const aircraftRepo = _aircraftRepo
export const worldRepo = _worldRepo
export const airportRepo = _airportRepo

const Repos = {
    flightRepo,
    companyRepo,
    aircraftRepo,
    worldRepo,
    airportRepo,
}

export default Repos