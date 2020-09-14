import React, {useEffect} from 'react'
import Content from "./Content";
import ObjectsTable from "./ObjectsTable";
import {deleteToken, requestTokens, createToken} from "../actions/tokens";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    user: state.login.jwt.info,
    tokens: state.tokens.data,
    tokensStatus: state.tokens.status,
    deleteStatus: state.tokens.deleteStatus,
    createStatus: state.tokens.createStatus
})

const mapDispatchToProps = dispatch => ({
    requestTokens: (userId) => dispatch(requestTokens(userId)),
    deleteToken: (id) => dispatch(deleteToken(id)),
    createToken: (userId) => dispatch(createToken(userId)),
})

const Settings = (props) => {
    const {requestTokens} = props
    useEffect(
        () => {
            requestTokens()
        }, [requestTokens])
    return (
        <Content>
            <h2>Settings</h2>
            <h3>User</h3>
            {/*TODO: implement change username form*/}
            {/*TODO: implement change password form*/}
            {/*TODO: current user session details*/}
            {/*TODO: current user role details*/}
            <h3>Long Lived Tokens</h3>
            <ObjectsTable
                objectsToDisplay={props.tokens.sort((a, b) => a.id - b.id)}
                objectMeta={{
                    name: 'API Tokens',
                    keys: {
                        id: {
                            column: 'Id'
                        },
                        dateCreated: {
                            column: 'Created',
                        },
                        dateExpired: {
                            column: 'Expires',
                        }
                    }
                }}
                deleteAction={(id) => props.deleteToken(id)}
                deleteStatus={props.deleteStatus}
                createAction={() => props.createToken()}
                createStatus={props.createStatus}
            />
        </Content>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
