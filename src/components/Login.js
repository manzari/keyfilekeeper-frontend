import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/login'
import {Form, Button, Col, Row} from "react-bootstrap";
import {push} from 'connected-react-router'
import SpinnerOverlay from "./SpinnerOverlay";

const mapStateToProps = state => ({
    roles: state.login.jwt.info.roles,
    loginStatus: state.login.status,
})

const mapDispatchToProps = dispatch => ({
    performLogin: (username, password) => dispatch(login(username, password)),
    push: (url) => dispatch(push(url))
})


const Login = (props) => {

    const [state, setState] = useState({username: "", password: ""})

    const handleSubmit = (e) => {
        e.preventDefault()
        props.performLogin(state.username, state.password)
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id.replace("loginForm_", "")]: e.target.value
        })
    }

    if (props.roles.includes('ROLE_USER')) {
        props.push('/')
    }

    return (
        <Row>
            <SpinnerOverlay status={props.loginStatus}/>
            <Col md={{span: 6, offset: 3}} style={{marginTop: "20%"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="loginForm_username">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="loginForm_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
