const tokensReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_TOKENS_REQUEST':
            return {
                ...state,
                status: 'request'
            }
        case 'GET_TOKENS_FAILURE':
            return {
                ...state,
                status: 'failure'
            }
        case 'GET_TOKENS_SUCCESS':
            return {
                ...state,
                data: action.payload,
                status: 'success'
            }
        case 'GET_TOKEN_SECRET_REQUEST':
            return {
                ...state
            }
        case 'GET_TOKEN_SECRET_FAILURE':
            return {
                ...state
            }
        case 'GET_TOKEN_SECRET_SUCCESS':
            return {
                ...state,
                data: state.data.map((token) => {
                    if (token.id === action.meta.id) {
                        token.token = action.payload.token
                    }
                    return token
                })
            }
        case 'CLEAN_TOKEN_SECRET':
            return {
                ...state,
                data: state.data.map((token) => {
                    if (token.id === action.meta.id) {
                        delete token.token
                    }
                    return token
                })
            }
        case 'CREATE_TOKEN_REQUEST':
            return {
                ...state,
                createStatus: 'request'
            }
        case 'CREATE_TOKEN_FAILURE':
            return {
                ...state,
                createStatus: 'failure'
            }
        case 'CREATE_TOKEN_SUCCESS':
            return {
                ...state,
                data: [
                    ...state.data.filter((item) => (item.id !== action.payload.id)),
                    action.payload
                ],
                createStatus: 'success'
            }
        case 'DELETE_TOKEN_REQUEST':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'request'
                }
            }
        case 'DELETE_TOKEN_FAILURE':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'failure'
                }
            }
        case 'DELETE_TOKEN_SUCCESS':
            return {
                ...state,
                data: state.data.filter((item) => (item.id !== action.meta.id)),
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'success'
                }
            }
        default:
            return state
    }
}

export default tokensReducer
