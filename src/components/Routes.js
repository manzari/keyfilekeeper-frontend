import React from 'react'
import {Route, Switch} from 'react-router'
import Home from '../components/Home'
import NoMatch from '../components/NoMatch'
import Imprint from "./Imprint";
import Counter from "./Counter";

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/imprint" component={Imprint}/>
                <Route path="/counter" component={Counter}/>
                <Route component={NoMatch}/>
            </Switch>
        </div>
    )
}

export default Routes
