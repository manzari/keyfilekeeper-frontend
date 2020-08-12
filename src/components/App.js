import React from 'react'
import Routes from "../Routes";
import NavBar from "./NavBar";
import {Container} from "react-bootstrap";
import {push} from "connected-react-router";
import {connect} from "react-redux";
import RoundedContainer from "./RoundedContainer";
import {IconContext} from "react-icons";

const mapStateToProps = state => ({
    roles: state.login.jwt.info.roles,
})

const mapDispatchToProps = dispatch => ({
    push: (url) => dispatch(push(url))
})

const App = (props, history) => {
    return (
        <Container>
            <RoundedContainer>
                <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
                    {
                        props.roles.includes('ROLE_USER') ?
                            <NavBar isAdmin={props.roles.includes('ROLE_ADMIN')}/> :
                            null
                    }
                    <Routes history={history}/>
                </IconContext.Provider>
            </RoundedContainer>
        </Container>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(App)