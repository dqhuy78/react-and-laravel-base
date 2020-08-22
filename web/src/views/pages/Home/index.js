import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { MdHome } from 'react-icons/md';

import { getLoopable } from '~/utils/type-helper';
import { exampleActions, exampleSelectors } from '~/state/modules/example';

const HomePage = () => {
    const dispatch = useDispatch();
    const data = useSelector(exampleSelectors.data, shallowEqual);

    const loadData = useCallback(
        () => dispatch(exampleActions.load()),
        [dispatch]
    );

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='shadow-md container px-4 py-2'>
                <h2 className='text-xl'>
                    <MdHome className='mr-1' />
                    {' '}
                    HomePage
                </h2>
                <ul>
                    {
                        getLoopable(data).map((user) => (
                            <li key={user.get('id')}>{user.get('name')}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
