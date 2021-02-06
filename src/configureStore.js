import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from './reducers'
import {createMiddleware} from "redux-api-middleware";
import reduxCookiesMiddleware from "redux-cookies-middleware/src";
import getStateFromCookies from "redux-cookies-middleware/lib/getStateFromCookies";
import jwtMiddleware from './middlewares/jwtMiddleware'
import unauthorizedMiddleware from "./middlewares/unauthorizedMiddleware";

export const history = createBrowserHistory()

const initialState = {
    login: {
        jwt: {
            token: '',
            info: {
                roles: []
            }
        },
        status: '',
    },
    volumes: {
        data: [],
        status: '',
        createStatus: '',
        deleteStatus: [],
        patchStatus: []
    },
    users: {
        data: [],
        status: '',
        createStatus: '',
        deleteStatus: [],
        patchStatus: []
    },
    tokens: {
        data: [],
        status: '',
        createStatus: '',
        deleteStatus: []
    }
}

const cookieConfig = {
    'login': {name: 'keyfilekeeper_login'}
};

export default function configureStore() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(
        createRootReducer(history),
        getStateFromCookies(initialState, cookieConfig),
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
                jwtMiddleware,
                createMiddleware(),
                unauthorizedMiddleware,
                reduxCookiesMiddleware(cookieConfig)
            ),
        ),
    )
}