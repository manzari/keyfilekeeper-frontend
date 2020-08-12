const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                status: 'request'
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                status: 'failure'
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                jwt: {
                    token: action.payload.token,
                    info: parseJwt(action.payload.token)
                },
                status: 'success'
            }
        case 'LOGOUT':
            return {
                jwt: {
                    token: '',
                    info: {
                        roles: []
                    }
                },
                status: '',
            }
        default:
            return state
    }
}

const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(
                function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }
            )
            .join('')
    );
    return JSON.parse(jsonPayload);
}

export default loginReducer
