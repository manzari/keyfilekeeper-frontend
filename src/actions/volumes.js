import {createAction} from 'redux-api-middleware'

export const requestVolumes = () => (
    createAction({
        endpoint: window.apiUrl + '/volumes',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'GET_VOLUMES_REQUEST',
            },
            {
                type: 'GET_VOLUMES_SUCCESS',
                payload: (action, state, res) => res.json()
            },
            {
                type: 'GET_VOLUMES_FAILURE',
                meta: (action, state, res) => ({httpCode: res.status})
            },
        ]
    })
)

export const createVolume = (volume) => (
    createAction({
        endpoint: window.apiUrl + '/volumes',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(volume, null),
        types: [
            {
                type: 'CREATE_VOLUME_REQUEST',
                meta: {id: volume.id}
            },
            {
                type: 'CREATE_VOLUME_SUCCESS',
                meta: {id: volume.id},
                payload: (action, state, res) => res.json()
            },
            {
                type: 'CREATE_VOLUME_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    meta: {id: volume.id}
                })
            },
        ]
    })
)

export const deleteVolume = (id) => (
    createAction({
        endpoint: window.apiUrl + '/volume/' + id,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        types: [
            {
                type: 'DELETE_VOLUME_REQUEST',
                meta: {id: id}
            },
            {
                type: 'DELETE_VOLUME_SUCCESS',
                meta: {id: id}
            },
            {
                type: 'DELETE_VOLUME_FAILURE',
                meta: (action, state, res) => ({
                    httpCode: res.status,
                    id: id
                })
            }
        ]
    })
)

export const patchVolume = (volume) => (
    createAction({
        endpoint: window.apiUrl + '/volume/' + volume.id,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(volume, null),
        types: [
            {
                type: 'PATCH_VOLUME_REQUEST',
                meta: {id: volume.id}
            },
            {
                type: 'PATCH_VOLUME_SUCCESS',
                payload: (action, state, res) => res.json(),
                meta: {id: volume.id}
            },
            {
                type: 'PATCH_VOLUME_FAILURE',
                meta: {id: volume.id}
            }
        ]
    })
)

