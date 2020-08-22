import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './state/configureStore';

import App from './views/App';
import rootSaga from './state/rootSaga';
import rootReducer from './state/rootReducer';
import sentryWatcher from '~/utils/Sentry/Watcher';

import './assets/styles/app.scss';
import './assets/styles/libs/tailwind.css';
import './assets/styles/theme/ant-custom.less';

if (module.hot) {
    module.hot.accept();
}

sentryWatcher();
const initialState = {};
const store = configureStore(initialState, rootReducer);
store.runSaga(rootSaga);

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
