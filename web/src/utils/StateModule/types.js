const initTypes = (namespace, extraTypes = {}) => {
    const LOAD_DATA = `${namespace}/LOAD_DATA`;
    const LOAD_DATA_SUCCESS = `${namespace}/LOAD_DATA_SUCCESS`;
    const LOAD_DATA_ERROR = `${namespace}/LOAD_DATA_ERROR`;
    const STORE_DATA = `${namespace}/STORE_DATA`;
    const STORE_PAGINATE = `${namespace}/STORE_PAGINATE`;
    const ADD_DATA = `${namespace}/ADD_DATA`;
    const UPDATE_DATA = `${namespace}/UPDATE_DATA`;
    const MERGE_DATA = `${namespace}/MERGE_DATA`;
    const DELETE_DATA = `${namespace}/DELETE_DATA`;
    const SET_DATA = `${namespace}/SET_DATA`;

    return {
        LOAD_DATA,
        LOAD_DATA_SUCCESS,
        LOAD_DATA_ERROR,
        STORE_DATA,
        STORE_PAGINATE,
        ADD_DATA,
        UPDATE_DATA,
        MERGE_DATA,
        DELETE_DATA,
        SET_DATA,
        ...extraTypes
    };
};

export default initTypes;
