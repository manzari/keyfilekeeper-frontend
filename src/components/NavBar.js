import React from 'react'
import {Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useLocation} from 'react-router-dom'

const NavBar = (props) => (
        <Nav variant="pills">
            <ConnectedNavItem link={"/volumes"} name={"Volumes"}/>
            <ConnectedNavItem link={"/settings"} name={"Settings"}/>
            {props.isAdmin ? <ConnectedNavItem link={"/admin"} name={"Admin"}/> : null}
            <ConnectedNavItem link={"/help"} name={"Help"}/>
        </Nav>
)

const ConnectedNavItem = (props) => (
    <Nav.Item active={(useLocation().pathname === props.link).toString()}>
        <LinkContainer to={props.link}>
            <Nav.Link>{props.name}</Nav.Link>
        </LinkContainer>
    </Nav.Item>
)


export default NavBar
