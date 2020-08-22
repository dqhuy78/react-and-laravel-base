import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import enums from '~/utils/enums';

const initReducer = (type = 'list', initTypes, extraInitState = {}, extraReducerActions = {}) => {
    let initState = null;
    if (type === 'list') {
        initState = fromJS({
            loadStatus: enums.STATUS.LOADING,
            data: [],
            paginate: {
                currentPage: 1,
                perPage: 1,
                total: 0
            },
            ...extraInitState
        });
    } else {
        initState = fromJS({
            loadStatus: enums.STATUS.LOADING,
            data: {},
            ...extraInitState
        });
    }

    const reducer = handleActions({
        [initTypes.LOAD_DATA]: (state) => state.set('loadStatus', enums.STATUS.LOADING),
        [initTypes.LOAD_DATA_SUCCESS]: (state) => state.set('loadStatus', enums.STATUS.SUCCESS),
        [initTypes.LOAD_DATA_ERROR]: (state) => state.set('loadStatus', enums.STATUS.FAIL),
        [initTypes.STORE_DATA]: (state, action) => state.set('data', fromJS(action.payload)),
        [initTypes.STORE_PAGINATE]: (state, action) => state.set('paginate', fromJS(action.payload)),
        [initTypes.ADD_DATA]: (state, action) => {
            const { path, data } = action.payload;

            return state.updateIn(['data', ...path], (list) => list.unshift(fromJS(data)));
        },
        [initTypes.UPDATE_DATA]: (state, action) => {
            const { path, data } = action.payload;

            return state.setIn(['data', ...path], fromJS(data));
        },
        [initTypes.MERGE_DATA]: (state, action) => {
            const { path, data } = action.payload;

            return state.mergeIn(['data', ...path], fromJS(data));
        },
        [initTypes.DELETE_DATA]: (state, action) => state.deleteIn(['data', ...action.payload]),
        [initTypes.SET_DATA]: (state, action) => {
            const { path, data } = action.payload;

            return state.setIn(['data', ...path], fromJS(data));
        },
        ...extraReducerActions
    }, initState);

    return reducer;
};

export default initReducer;
