import {isRSAA} from "redux-api-middleware";

const jwtMiddleware = (store) => (next) => (action) => {
    if (
        isRSAA(action)
        && !action["@@redux-api-middleware/RSAA"].types.includes('LOGIN_REQUEST')
    ) {
        action["@@redux-api-middleware/RSAA"].headers = {
            ...action["@@redux-api-middleware/RSAA"].headers,
            Authorization: 'Bearer ' + store.getState().login.jwt.token
        }
    }
    next(action);
};
export default jwtMiddleware;