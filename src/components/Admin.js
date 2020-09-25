import React, {useEffect} from 'react'
import Content from "./Content";
import SecretModal from "./SecretModal";
import ObjectsTable from "./ObjectsTable";
import {createUser, deleteUser, patchUser, requestUsers} from "../actions/users";
import {connect} from "react-redux";


const mapStateToProps = state => ({
    users: state.users.data,
    usersStatus: state.users.status,
    deleteStatus: state.users.deleteStatus,
    createStatus: state.users.createStatus,
    patchStatus: state.users.patchStatus
})

const mapDispatchToProps = dispatch => ({
    requestUsers: () => dispatch(requestUsers()),
    deleteUser: (username) => dispatch(deleteUser(username)),
    createUser: (user) => dispatch(createUser(user)),
    patchUser: (user) => dispatch(patchUser(user))
})


const Admin = (props) => {
    const {requestUsers} = props
    useEffect(
        () => {
            requestUsers()
        }, [requestUsers])
    return (
        <Content isAdmin={true}>
            <h2>Admin Settings</h2>
            <h3>Users</h3>
            <ObjectsTable
                objectsToDisplay={props.users.sort((a, b) => a.id - b.id)}
                objectMeta={{
                    name: 'Users',
                    keys: {
                        id: {
                            column: 'Id'
                        },
                        username: {
                            column: 'Username',
                            editable: true
                        },
                        volumes: {
                            column: 'Volumes Count',
                            callback: (objectToDisplay) => objectToDisplay.volumes.length
                        },
                        roles: {
                            column: 'Admin',
                            type: 'boolean',
                            align: 'center',
                            callback: (objectToDisplay) => objectToDisplay.roles.includes('ROLE_ADMIN')
                        }
                    }
                }}
                deleteAction={(username) => props.deleteUser(username)}
                deleteStatus={props.deleteStatus}
                createAction={() => props.createUser( {})}
                createStatus={props.createStatus}
                patchAction={(user) => props.patchUser(user)}
                patchStatus={props.patchStatus}
                additionalActions={
                    (user) =>
                        <SecretModal
                            object={user}
                            patchAction={(secret) => props.patchUser({...user, password: secret})}
                            patchStatus={props.patchStatus}
                            text={"Paste the new password for \"" + user.username + "\" below"}
                            title={"Replace Password"}
                        />
                }
            />
        </Content>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
