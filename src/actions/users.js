import {createAction} from 'redux-api-middleware'

export const requestUsers = () => (
    createAction({
        endpoint: window.apiUrl + '/users',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'GET_USERS_REQUEST',
            },
            {
                type: 'GET_USERS_SUCCESS',
                payload: (action, state, res) => res.json()
            },
            {
                type: 'GET_USERS_FAILURE',
                meta: (action, state, res) => ({httpCode: res.status})
            },
        ]
    })
)

export const createUser = (user) => (
    createAction({
        endpoint: window.apiUrl + '/users',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user, null),
        types: [
            {
                type: 'CREATE_USER_REQUEST',
            },
            {
                type: 'CREATE_USER_SUCCESS',
                payload: (action, state, res) => res.json()
            },
            {
                type: 'CREATE_USER_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status
                })
            },
        ]
    })
)

export const deleteUser = (id) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + id,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'DELETE_USER_REQUEST',
                meta: {id: id}
            },
            {
                type: 'DELETE_USER_SUCCESS',
                meta: {id: id}
            },
            {
                type: 'DELETE_USER_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    id: id
                })
            }
        ]
    })
)

export const patchUser = (user) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + user.id,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user, null),
        types: [
            {
                type: 'PATCH_USER_REQUEST',
                meta: {id: user.id}
            },
            {
                type: 'PATCH_USER_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {id: user.id}
            },
            {
                type: 'PATCH_USER_FAILURE',
                meta: {id: user.id}
            }
        ]
    })
)

