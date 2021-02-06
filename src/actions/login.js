import {createAction} from 'redux-api-middleware'

export const login = (username, password) => (
    createAction({
        endpoint: window.apiUrl + '/login_check',
        method: 'POST',
        body: JSON.stringify({username: username, password: password}, null),
        headers: {'Content-Type': 'application/json'},
        types: [
            'LOGIN_REQUEST',
            'LOGIN_SUCCESS',
            {
                type: 'LOGIN_FAILURE',
                meta: (action, state, res) => ({httpCode: res.status})
            }
        ],
    })
)

export const logout = () => (
    {type: 'LOGOUT'}
)

