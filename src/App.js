import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../src/components/body.scss';

import { Routes, Route } from 'react-router-dom';

import Home from './containers/users/Home/Home';
import Shop from './containers/users/Shop/Shop';
import News from './containers/users/News/News';
import Contact from './containers/users/Contact/Contact';
import Detail from './containers/users/Detail/Detail';

import Category from './containers/auth/categories/category';
import Product from './containers/auth/products/products';
import Image from './containers/auth/image/image';
import LoginAuth from './containers/auth/loginAuth/loginAuth';

import store from './redux/store';

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {/* <Index /> */}
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/Shop" element={<Shop />} />
                    <Route path="/News" element={<News />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Detail/:id" element={<Detail />} />

                    {/* <Route path="/index" element={<Index />} /> */}
                    <Route path="/Auth" element={<LoginAuth />} />
                    <Route path="/Auth/Category" element={<Category />} />
                    <Route path="/Auth/Product" element={<Product />} />
                    <Route path="/Auth/Image" element={<Image />} />
                </Routes>
            </Provider>
        </BrowserRouter>

    );
}

export default App;
