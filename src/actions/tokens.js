import {createAction} from 'redux-api-middleware'

export const requestTokens = (volumeId) => (
    createAction({
        endpoint: window.apiUrl + '/tokens/volume/' + volumeId,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'GET_TOKENS_REQUEST',
                meta: {volumeId: volumeId}
            },
            {
                type: 'GET_TOKENS_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {volumeId: volumeId}
            },
            {
                type: 'GET_TOKENS_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    volumeId: volumeId
                })
            },
        ]
    })
)

export const requestTokenSecret = (id) => (
    createAction({
        endpoint: window.apiUrl + '/token/' + id + '/secret',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'GET_TOKEN_SECRET_REQUEST',
                meta: {id: id}
            },
            {
                type: 'GET_TOKEN_SECRET_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {id: id}
            },
            {
                type: 'GET_TOKEN_SECRET_FAILURE',
                meta: (action, state, res) => ({
                    id: id,
                    httpCode: res.status
                })
            },
        ]
    })
)

export const cleanTokenSecret = (id) => (
    {
        type: 'CLEAN_TOKEN_SECRET',
        meta: {id: id}
    }
)

export const createToken = (volumeId) => (
    createAction({
        endpoint: window.apiUrl + '/tokens',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({volumeId: volumeId}, null),
        types: [
            {
                type: 'CREATE_TOKEN_REQUEST',
                meta: {volumeId: volumeId}
            },
            {
                type: 'CREATE_TOKEN_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {volumeId: volumeId}
            },
            {
                type: 'CREATE_TOKEN_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    volumeId: volumeId
                })
            },
        ]
    })
)

export const deleteToken = (id) => (
    createAction({
        endpoint: window.apiUrl + '/token/' + id,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'DELETE_TOKEN_REQUEST',
                meta: {id: id}
            },
            {
                type: 'DELETE_TOKEN_SUCCESS',
                meta: {id: id}
            },
            {
                type: 'DELETE_TOKEN_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    id: id
                })
            }
        ]
    })
)

