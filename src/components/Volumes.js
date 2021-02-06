import React, {useEffect} from 'react'
import Content from "./Content";
import SpinnerOverlay from "./SpinnerOverlay";
import {connect} from "react-redux";
import {requestVolumes, deleteVolume, createVolume, patchVolume} from "../actions/volumes";
import {deleteToken, createToken, requestTokens, requestTokenSecret, cleanTokenSecret} from "../actions/tokens";
import ObjectsTable from "./ObjectsTable";
import ObjectModal from "./ObjectModal";
import SecretModal from "./SecretModal";
import {AiFillApi} from "react-icons/ai";
import {FaKey} from 'react-icons/fa'
import TokenModal from "./TokenModal";


const mapStateToProps = state => ({
    volumes: state.volumes.data,
    volumeStatus: state.volumes.status,
    deleteStatus: state.volumes.deleteStatus,
    createStatus: state.volumes.createStatus,
    patchStatus: state.volumes.patchStatus,
    tokens: state.tokens.data,
    deleteTokenStatus: state.tokens.deleteStatus,
    createTokenStatus: state.tokens.deleteStatus,
    requestTokenSecretStatus: state.tokens.requestTokenSecretStatus,
    cleanTokenSecretStatus: state.tokens.cleanTokenSecretStatus
})

const mapDispatchToProps = dispatch => ({
    requestVolumes: () => dispatch(requestVolumes()),
    deleteVolume: (id) => dispatch(deleteVolume(id)),
    createVolume: (volume) => dispatch(createVolume(volume)),
    patchVolume: (volume) => dispatch(patchVolume(volume)),
    requestTokens: (id) => dispatch(requestTokens(id)),
    deleteToken: (id) => dispatch(deleteToken(id)),
    createToken: (volumeId) => dispatch(createToken(volumeId)),
    requestTokenSecret: (id) => dispatch(requestTokenSecret(id)),
    cleanTokenSecret: (id) => dispatch(cleanTokenSecret(id)),
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
                            editable: true
                        },
                        user: {
                            column: 'User'
                        },
                        volumeTokens: {
                            column: 'Tokens Count',
                            callback: (volume) => volume.volumeTokens.length
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
                        <>
                            <SecretModal
                                icon={<FaKey/>}
                                object={volume}
                                patchAction={(secret) => props.patchVolume({...volume, secret: secret})}
                                patchStatus={props.patchStatus}
                                text={"Paste the new secret for \"" + volume.name + "\" below"}
                                title={"Replace Secret"}
                            />
                            <ObjectModal
                                icon={<AiFillApi/>}
                                title={"Tokens for volume " + volume.id}
                                objects={props.tokens}
                                objectFilter={(object) => (object.volume === volume.id)}
                                parentId={volume.id}
                                objectMeta={{
                                    name: 'API Tokens',
                                    keys: {
                                        id: {
                                            column: 'Id'
                                        },
                                        dateCreated: {
                                            column: 'Created',
                                            type: 'datetime'
                                        },
                                        dateExpired: {
                                            column: 'Expires',
                                            type: 'datetime'
                                        }
                                    }
                                }}
                                deleteAction={(id) => props.deleteToken(id)}
                                deleteStatus={props.deleteTokenStatus}
                                requestAction={() => props.requestTokens(volume.id)}
                                createAction={() => props.createToken(volume.id)}
                                createStatus={props.createTokenStatus}
                                additionalActions={
                                    (token) =>
                                        <TokenModal
                                            object={token}
                                            requestTokenSecret={(id) => props.requestTokenSecret(id)}
                                            cleanTokenSecret={(id) => props.cleanTokenSecret(id)}
                                        />
                                }
                            />
                        </>
                }
            />
        </Content>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Volumes)
//TODO: fix token count on create/delete
//TODO: implement Modal to view and copy token