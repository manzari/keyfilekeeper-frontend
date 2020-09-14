import {createAction} from 'redux-api-middleware'

export const requestTokens = (userId = false) => (
    createAction({
        endpoint: window.apiUrl + (userId !== false ? '/user/' + userId : '') + '/tokens',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'GET_TOKENS_REQUEST',
            },
            {
                type: 'GET_TOKENS_SUCCESS',
                payload: (action, state, res) => res.json()
            },
            {
                type: 'GET_TOKENS_FAILURE',
                meta: (action, state, res) => ({httpCode: res.status})
            },
        ]
    })
)

export const createToken = (userId) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + userId + '/tokens',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}, null),
        types: [
            {
                type: 'CREATE_TOKEN_REQUEST'
            },
            {
                type: 'CREATE_TOKEN_SUCCESS',
                payload: (action, state, res) => res.json()
            },
            {
                type: 'CREATE_TOKEN_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status
                })
            },
        ]
    })
)

export const deleteToken = (id, userId) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + userId + '/token/' + id,
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

