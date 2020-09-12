const volumesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_VOLUMES_REQUEST':
            return {
                ...state,
                status: 'request'
            }
        case 'GET_VOLUMES_FAILURE':
            return {
                ...state,
                status: 'failure'
            }
        case 'GET_VOLUMES_SUCCESS':
            return {
                ...state,
                data: action.payload,
                status: 'success'
            }
        case 'CREATE_VOLUME_REQUEST':
            return {
                ...state,
                createStatus: 'request'
            }
        case 'CREATE_VOLUME_FAILURE':
            return {
                ...state,
                createStatus: 'failure'
            }
        case 'CREATE_VOLUME_SUCCESS':
            return {
                ...state,
                data: [
                    ...state.data.filter((item) => (item.id !== action.payload.id)),
                    action.payload
                ],
                createStatus: 'success'
            }
        case 'DELETE_VOLUME_REQUEST':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'request'
                }
            }
        case 'DELETE_VOLUME_FAILURE':
            return {
                ...state,
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'failure'
                }
            }
        case 'DELETE_VOLUME_SUCCESS':
            return {
                ...state,
                data: state.data.filter((item) => (item.id !== action.meta.id)),
                deleteStatus: {
                    ...state.deleteStatus,
                    [action.meta.id]: 'success'
                }
            }
        case 'PATCH_VOLUME_REQUEST':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.id]: 'request'
                }
            }
        case 'PATCH_VOLUME_FAILURE':
            return {
                ...state,
                patchStatus: {
                    ...state.patchStatus,
                    [action.meta.id]: 'failure'
                }
            }
        case 'PATCH_VOLUME_SUCCESS':
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

export default volumesReducer
