import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { fromJS } from 'immutable';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, rootReducer) {
    const middlewares = [
        sagaMiddleware
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    const store = createStore(
        rootReducer(),
        fromJS(initialState),
        compose(...enhancers)
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
}
