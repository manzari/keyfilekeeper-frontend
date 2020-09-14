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

export const deleteUser = (username) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + username,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'DELETE_USER_REQUEST',
                meta: {username: username}
            },
            {
                type: 'DELETE_USER_SUCCESS',
                meta: {username: username}
            },
            {
                type: 'DELETE_USER_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    username: username
                })
            }
        ]
    })
)

export const patchUser = (user) => (
    createAction({
        endpoint: window.apiUrl + '/user/' + user.username,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user, null),
        types: [
            {
                type: 'PATCH_USER_REQUEST',
                meta: {username: user.username}
            },
            {
                type: 'PATCH_USER_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {username: user.username}
            },
            {
                type: 'PATCH_USER_FAILURE',
                meta: {username: user.username}
            }
        ]
    })
)

