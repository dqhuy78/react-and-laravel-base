import React, { lazy, Suspense } from 'react';

import './style.scss';

export const Loading = (
    <div className='loadable'>
        <div className='scaling-squares-spinner'>
            <div className='square' />
            <div className='square' />
            <div className='square' />
            <div className='square' />
        </div>
    </div>
);

const Loadable = (func) => {
    const Component = lazy(func);

    return (props) => (
        <Suspense fallback={Loading}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;
