import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Index from '../src/routers/index';
import '../src/components/body.scss';

import store from './redux/store';

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Index />
            </Provider>
        </BrowserRouter>

    );
}

export default App;
