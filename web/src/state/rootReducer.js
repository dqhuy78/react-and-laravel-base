import { combineReducers } from 'redux-immutable';

import auth from './modules/auth';
import { exampleReducer as example } from './modules/example';

/**
 * Creates the root reducer with the asynchronously loaded ones
 */
export default function rootReducer(asyncReducers) {
    return combineReducers({
        auth,
        example,
        ...asyncReducers
    });
}
