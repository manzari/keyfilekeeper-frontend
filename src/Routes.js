import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import NoMatch from './components/NoMatch'
import Login from "./components/Login";
import Volumes from "./components/Volumes";
import User from "./components/User";
import Admin from "./components/Admin";

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from='/' to='/volumes'/>
            <Route path="/login" component={Login}/>
            <Route path="/volumes" component={Volumes}/>
            <Route path="/user" component={User}/>
            <Route path="/admin" component={Admin}/>
            <Route component={NoMatch}/>
        </Switch>
    )
}

export default Routes
