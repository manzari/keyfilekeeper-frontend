import React, {useEffect} from 'react'
import Content from "./Content";
import SpinnerOverlay from "./SpinnerOverlay";
import {connect} from "react-redux";
import {requestVolumes, deleteVolume, createVolume, patchVolume} from "../actions/volumes";
import ObjectsTable from "./ObjectsTable";
import SecretModal from "./SecretModal";


const mapStateToProps = state => ({
    volumes: state.volumes.data,
    volumeStatus: state.volumes.status,
    deleteStatus: state.volumes.deleteStatus,
    createStatus: state.volumes.createStatus,
    patchStatus: state.volumes.patchStatus
})

const mapDispatchToProps = dispatch => ({
    requestVolumes: () => dispatch(requestVolumes()),
    deleteVolume: (id) => dispatch(deleteVolume(id)),
    createVolume: (volume) => dispatch(createVolume(volume)),
    patchVolume: (volume) => dispatch(patchVolume(volume))
})

const Volumes = (props) => {
    const {requestVolumes} = props
    useEffect(
        () => {
            requestVolumes()
        }, [requestVolumes])
    return (
        <Content>
            <SpinnerOverlay status={props.volumeStatus}/>
            <h2>Volumes</h2>
            <ObjectsTable
                objectsToDisplay={props.volumes.sort((a, b) => (b.id - a.id))}
                objectMeta={{
                    name: 'Volume',
                    keys: {
                        id: {
                            column: 'Id'
                        },
                        name: {
                            column: 'Name',
                            editableString: true
                        },
                        user: {
                            column: 'User'
                        }
                    }
                }}
                deleteAction={(id) => props.deleteVolume(id)}
                deleteStatus={props.deleteStatus}
                createAction={(volume) => props.createVolume(volume)}
                createStatus={props.createStatus}
                emptyObject={{name: 'Unnamed Volume', secret: ''}}
                patchAction={(volume) => props.patchVolume(volume)}
                patchStatus={props.patchStatus}
                additionalActions={
                    (volume) =>
                        <SecretModal
                            object={volume}
                            patchAction={(secret) => props.patchVolume({id: volume.id, secret: secret})}
                            patchStatus={props.patchStatus}
                            text={"Paste your new secret below"}
                            title={volume.name + " Secret"}
                        />
                }
            />
        </Content>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Volumes)
