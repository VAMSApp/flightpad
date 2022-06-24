import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/company`;

export const companyService = {
    getOnAirCompanyDetails,
    getById,
    getAll,
    findById: getById,
    findByGuid: getByGuid,
    findByICAO: getByICAO,
    findAll: getAll,
    toggleOnAirCompanyTracking,
    toggleOnAirFleetTracking,
    toggleOnAirFlightsTracking,
    toggleOnAirEmployeesTracking,
    create,
    update,
    destroy,
};

async function getOnAirCompanyDetails(x, opts) {
    return await fetchWrapper.post(`${baseUrl}/onair/queryCompanyDetails`, {
        content: x
    })
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function toggleOnAirCompanyTracking(id, params) {
    if (!id) throw 'No id provided to toggle OnAirSync'
    
    return await fetchWrapper.put(`${baseUrl}/${id}/toggleOnAirCompanyTracking`, params);
}

async function toggleOnAirFleetTracking(id, params) {
    if (!id) throw 'No id provided to toggle OnAirSync'
    
    return await fetchWrapper.put(`${baseUrl}/${id}/toggleOnAirFleetTracking`, params);
}

async function toggleOnAirFlightsTracking(id, params) {
    if (!id) throw 'No id provided to toggle OnAirSync'
    
    return await fetchWrapper.put(`${baseUrl}/${id}/toggleOnAirFlightsTracking`, params);
}

async function toggleOnAirEmployeesTracking(id, params) {
    if (!id) throw 'No id provided to toggle OnAirSync'
    
    return await fetchWrapper.put(`${baseUrl}/${id}/toggleOnAirEmployeesTracking`, params);
}




async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function getByGuid(guid) {
    return await fetchWrapper.get(`${baseUrl}/guid/${guid}`);
}

async function getByICAO(icao) {
    return await fetchWrapper.get(`${baseUrl}/icao/${icao}`);
}

async function create(x) {
    if (!x) throw 'No data provided to create'

    return await fetchWrapper.post(`${baseUrl}`, {
        content: x,
    })
}

async function update(id, params) {
    return await fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function destroy(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
}