import React from 'react';

import { Provider } from 'react-redux';
import Index from '../src/routers/index';
import '../src/components/body.scss';

import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}

export default App;
