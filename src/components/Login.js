import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/login'
import {Form, Button, Col, Row} from "react-bootstrap";
import {push} from 'connected-react-router'
import SpinnerOverlay from "./SpinnerOverlay";
import Content from "./Content";

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
        <Content>
            <Row>
                <SpinnerOverlay status={props.loginStatus}/>
                <h2>Login</h2>
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
                        <h6 style={{color: 'red', display: props.loginStatus === 'failure' ? 'block' : 'none'}}>Last
                            login failed. Check your credentials.</h6>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Content>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
