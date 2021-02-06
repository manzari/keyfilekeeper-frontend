import {logout} from "../actions/login";

const unauthorizedMiddleware = (store) => (next) => (action) => {
    if (action.hasOwnProperty('type') && action.type.endsWith('_FAILURE')) {
        if (action.hasOwnProperty('meta') && action.meta.httpCode === 401) {
            store.dispatch(logout())
        }
    }
    next(action);
};
export default unauthorizedMiddleware;