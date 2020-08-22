import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

//= ======== REDUCERS ==========//
const initState = fromJS({
    user: window.GLOBALS.user
});
export default handleActions({}, initState);

//= ========= SELECTOR ==========//
export const getAuthUser = (state) => state.get('auth').get('user');
