const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USERS_REQUEST':
            return {
                ...state,
                status: 'request'
            }
        case 'GET_USERS_FAILURE':
            return {
                ...state,
                status: 'failure'
            }
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                data: action.payload,
                status: 'success'
            }
        case 'CREATE_USER_REQUEST':
            return {
                ...state,
                createStatus: 'request'
            }
        case 'CREATE_USER_FAILURE':
            return {
                ...state,
                createStatus: 'failure'
            }
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                data: [
                    ...state.data.filter((item) => (item.id !== action.payload.id)),
                    action.payload
                ],
                createStatus: 'success'
            }
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'request'
                }
            }
        case 'DELETE_USER_FAILURE':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'failure'
                }
            }
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                data: state.data.filter((item) => (item.id !== action.meta.id)),
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'success'
                }
            }
        case 'PATCH_USER_REQUEST':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.id]: 'request'
                }
            }
        case 'PATCH_USER_FAILURE':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.id]: 'failure'
                }
            }
        case 'PATCH_USER_SUCCESS':
            return {
                ...state,
                data: [
                    ...state.data.filter((item) => (item.id !== action.payload.id)),
                    action.payload
                ],
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.id]: 'success'
                }
            }
        default:
            return state
    }
}

export default usersReducer
