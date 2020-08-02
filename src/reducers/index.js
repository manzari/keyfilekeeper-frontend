import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import counterReducer from "./counter";

const createRootReducer = (history) => combineReducers(
    {
        count: counterReducer,
        router: connectRouter(history)
    }
)

export default createRootReducer
