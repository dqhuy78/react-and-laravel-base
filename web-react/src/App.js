import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import './assets/styles/tailwind.css';
import './assets/styles/app.css';

function App() {

    useEffect(() => {
        async function getInitData() {
            const { data } = await axios.get('/api/web-init');
            console.log(data);
        }

        getInitData();
    }, [])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="box-shadow">Button</div>
            <Button type="primary">OK</Button>
            <div>
                <p>okokok</p>
            </div>
        </div>
    );
}

export default App;
