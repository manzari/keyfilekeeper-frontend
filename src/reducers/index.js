import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import counterReducer from "./counter";
import loginReducer from "./login";
import volumesReducer from "./volumes";

const createRootReducer = (history) => combineReducers(
    {
        count: counterReducer,
        router: connectRouter(history),
        login: loginReducer,
        volumes: volumesReducer
    }
)

export default createRootReducer
