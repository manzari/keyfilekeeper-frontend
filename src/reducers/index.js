import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import counterReducer from "./counter";
import loginReducer from "./login";
import volumesReducer from "./volumes";
import usersReducer from "./users";
import tokensReducer from "./tokens";

const createRootReducer = (history) => combineReducers(
    {
        count: counterReducer,
        router: connectRouter(history),
        login: loginReducer,
        volumes: volumesReducer,
        users: usersReducer,
        tokens: tokensReducer,
    }
)

export default createRootReducer
