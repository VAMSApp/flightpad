import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/flight`;

export const flightService = {
    getById,
    getAll,
    findOne: getById,
    findAll: getAll,
    hasDeparted,
    hasArrived,
    create,
    update,
    destroy,
};

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function hasDeparted(id, x) {
    return await fetchWrapper.put(`${baseUrl}/${id}/hasDeparted`, {
        content: x,
    });
}

async function hasArrived(id, x) {
    return await fetchWrapper.put(`${baseUrl}/${id}/hasArrived`, {
        content: x,
    });
}

async function create(x) {
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