import React, {useEffect} from 'react'
import Content from "./Content";
import ObjectsTable from "./ObjectsTable";
import {deleteToken, requestTokens, createToken, requestTokenSecret, cleanTokenSecret} from "../actions/tokens";
import {connect} from "react-redux";
import TokenModal from "./TokenModal";

const mapStateToProps = state => ({
    user: state.login.jwt.info,
    tokens: state.tokens.data,
    tokensStatus: state.tokens.status,
    deleteStatus: state.tokens.deleteStatus,
    createStatus: state.tokens.createStatus
})

const mapDispatchToProps = dispatch => ({
    requestTokens: () => dispatch(requestTokens()),
    deleteToken: (id) => dispatch(deleteToken(id)),
    createToken: () => dispatch(createToken()),
    requestTokenSecret: (id) => dispatch(requestTokenSecret(id)),
    cleanTokenSecret: (id) => dispatch(cleanTokenSecret(id)),
})

const Settings = (props) => {
    const {requestTokens} = props
    useEffect(
        () => {
            requestTokens()
        }, [requestTokens])
    console.log(props.tokens)
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
                        user: {
                            column: 'Owner'
                        }
                    }
                }}
                deleteAction={(id) => props.deleteToken(id)}
                deleteStatus={props.deleteStatus}
                createAction={() => props.createToken(props.user.username)}
                createStatus={props.createStatus}
                additionalActions={
                    (token) =>
                        <TokenModal
                            token={token}
                            requestTokenSecret={() => props.requestTokenSecret(token.id)}
                            cleanTokenSecret={() => props.cleanTokenSecret(token.id)}
                        />
                }
            />
        </Content>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
