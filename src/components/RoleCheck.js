import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const mapStateToProps = state => ({
    roles: state.login.jwt.info.roles,
})

const RoleCheck = (props) => {
    if (!props.roles.includes(props.role)) {
        return <Redirect to='/login'/>
    }
    return null
}

export default connect(mapStateToProps, null)(RoleCheck)
