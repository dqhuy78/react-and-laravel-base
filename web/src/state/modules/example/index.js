import { put, call, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import handleError from '~/utils/ErrorHandler';
import { getStateModule } from '~/utils/StateModule';

const namespace = 'example';

//= ========= RUN STATE ==========//
const defaultStateModule = getStateModule(namespace, 'list');

const exampleTypes = defaultStateModule.types;
const exampleActions = defaultStateModule.actions;
const exampleReducer = defaultStateModule.reducer;
const exampleSelectors = defaultStateModule.selectors;

//= ========= SAGAS ==========//
export function* sagas() {
    yield takeLatest(exampleTypes.LOAD_DATA, loadData);
}

function* loadData() {
    try {
        const { data } = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
        yield put(exampleActions.storeData(data));
        yield put(exampleActions.loadSuccess());
    } catch (error) {
        yield put(exampleActions.loadFail());
        handleError(error);
    }
}

export {
    exampleTypes,
    exampleActions,
    exampleSelectors,
    exampleReducer
};
