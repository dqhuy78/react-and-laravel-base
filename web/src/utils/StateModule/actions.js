import { createAction } from 'redux-actions';

const initActions = (initTypes, otherActions = {}) => {
    const load = createAction(initTypes.LOAD_DATA);
    const loadSuccess = createAction(initTypes.LOAD_DATA_SUCCESS);
    const loadFail = createAction(initTypes.LOAD_DATA_ERROR);
    const storeData = createAction(initTypes.STORE_DATA, (data) => data);
    const storePaginate = createAction(initTypes.STORE_PAGINATE, (meta) => meta);
    const addData = createAction(initTypes.ADD_DATA, (path, data) => ({ path, data }));
    const updateData = createAction(initTypes.UPDATE_DATA, (path, data) => ({ path, data }));
    const mergeData = createAction(initTypes.MERGE_DATA, (path, data) => ({ path, data }));
    const deleteData = createAction(initTypes.DELETE_DATA, (path) => path);
    const setData = createAction(initTypes.SET_DATA, (path, data) => ({ path, data }));

    return {
        load,
        loadSuccess,
        loadFail,
        storeData,
        storePaginate,
        addData,
        updateData,
        mergeData,
        deleteData,
        setData,
        ...otherActions
    };
};

export default initActions;
