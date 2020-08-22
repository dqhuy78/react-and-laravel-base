import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '~/routes/';
import sentryCapture from '~/utils/Sentry/Capture';

class App extends Component {
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        sentryCapture(error, errorInfo);
    }

    renderRoute = (routeList) => (
        <Switch>
            {
                routeList.map((route) => (
                    <Route key={route.name} {...route} />
                ))
            }
        </Switch>
    );

    render() {
        return (
            <div className='app'>
                {this.renderRoute(routes)}
            </div>
        );
    }
}

export default App;
