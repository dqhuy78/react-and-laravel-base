import initTypes from './types';
import initActions from './actions';
import initSelectors from './selectors';
import iniReducer from './reducer';

/* eslint-disable */
export const getStateModule = (
    namespace,
    dataType = 'list',
    extraTypes = {},
    extraActions = {},
    extraInitState = {},
    extraSelectors = {},
    extraReducerActions = {}
) => {
    const types = initTypes(namespace, extraTypes);

    return {
        types,
        actions: initActions(types, extraActions),
        selectors: initSelectors(namespace, extraSelectors),
        reducer: iniReducer(
            dataType,
            types,
            extraInitState,
            extraReducerActions
        )
    };
};
/* eslint-enable */
