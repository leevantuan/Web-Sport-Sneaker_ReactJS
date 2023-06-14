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
import ViewCart from './containers/users/Cart/ViewCart';
import Account from './containers/users/MyAccount/account';

import Category from './containers/auth/categories/category';
import Product from './containers/auth/products/products';
import Image from './containers/auth/image/image';
import LoginAuth from './containers/auth/loginAuth/loginAuth';
import User from './containers/auth/user/user';
import Cart from './containers/auth/cart/cart';
import Order from './containers/auth/order/order';

import LoginUser from './containers/users/Login/LoginUser';
import Register from './containers/users/Login/Register';

import store from './redux/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>

                    <Route path="/" element={<LoginUser />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Shop" element={<Shop />} />
                    <Route path="/News" element={<News />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Detail/:id" element={<Detail />} />
                    <Route path="/ViewCart" element={<ViewCart />} />
                    <Route path="/Account" element={<Account />} />

                    <Route path="/Auth" element={<LoginAuth />} />
                    <Route path="/Auth/Category" element={<Category />} />
                    <Route path="/Auth/Product" element={<Product />} />
                    <Route path="/Auth/Image" element={<Image />} />
                    <Route path="/Auth/User" element={<User />} />
                    <Route path="/Auth/Cart" element={<Cart />} />
                    <Route path="/Auth/Order" element={<Order />} />
                </Routes>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </BrowserRouter>

    );
}

export default App;
