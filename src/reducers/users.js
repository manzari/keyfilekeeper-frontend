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
                    ...state.data.filter((item) => (item.username !== action.payload.username)),
                    action.payload
                ],
                createStatus: 'success'
            }
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.username]: 'request'
                }
            }
        case 'DELETE_USER_FAILURE':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.username]: 'failure'
                }
            }
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                data: state.data.filter((item) => (item.username !== action.meta.username)),
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.username]: 'success'
                }
            }
        case 'PATCH_USER_REQUEST':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.username]: 'request'
                }
            }
        case 'PATCH_USER_FAILURE':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.username]: 'failure'
                }
            }
        case 'PATCH_USER_SUCCESS':
            return {
                ...state,
                data: [
                    ...state.data.filter((item) => (item.username !== action.payload.username)),
                    action.payload
                ],
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.username]: 'success'
                }
            }
        default:
            return state
    }
}

export default usersReducer
