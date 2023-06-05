import React, { useState } from 'react';
import '../components/body.scss'
import './router.scss'

import { Routes, Route, Link } from 'react-router-dom';

import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFirefox } from "react-icons/fa";
import { AiOutlineEnvironment } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { FaBars } from "react-icons/fa";

import Home from '../containers/users/Home/Home';
import Shop from '../containers/users/Shop/Shop';
import News from '../containers/users/News/News';
import Contact from '../containers/users/Contact/Contact';
import Detail from '../containers/users/Detail/Detail';
import Item from '../components/ItemSearch/Item';

//ath
import Category from '../containers/auth/categories/category';
import Product from '../containers/auth/products/products';
import { useSelector } from 'react-redux';
//

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
    const [bar, setBar] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [inputSearch, setInputSearch] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [list, setList] = useState(false)

    const Products = useSelector((state) => state.products)

    const ProductsSearch = Products.filter((e) => e.name.includes(textSearch))

    const HandleClickDetail = () => {
        setShowSearch(false)
        setInputSearch(false)
    }
    return (
        <div className='container'>
            <nav>
                <div className='nav-container dsFlex justify-between width-1200'>
                    <div className='logo dsFlex'>
                        <img src={require('../assets/logo.png')} alt='logo' />
                        <h1> Monday.</h1>
                    </div>
                    <ul className='menu dsFlex justify-between box-sizing'>
                        <li
                            className='menu-item box-sizing'
                        ><Link className='link' to="/">Home</Link></li>
                        <li
                            className='menu-item box-sizing'

                        ><Link className='link' to="/Shop">Shop</Link></li>
                        <li
                            className='menu-item box-sizing'

                        ><Link className='link' to="/News">News</Link></li>
                        <li
                            className='menu-item box-sizing'

                        ><Link className='link' to="/Contact">Contact</Link></li>
                    </ul>
                    <ul className='search dsFlex'>
                        <li className='box-sizing'
                            onClick={() => {
                                setShowSearch(true)
                                setInputSearch(true)
                            }}
                        > <AiOutlineSearch /> </li>
                        <li className='box-sizing'> <AiOutlineUser /> </li>
                        <li className='box-sizing'> <AiOutlineShoppingCart /> </li>
                    </ul>
                    {bar ?
                        <div className='tab-bar' onClick={() => setBar(!bar)}>
                            <h2>X</h2>
                            <ul>
                                <li><Link className='link' to="/">Home</Link></li>
                                <li><Link className='link' to="/Shop">Shop</Link></li>
                                <li><Link className='link' to="/News">News</Link></li>
                                <li><Link className='link' to="/Contact">Contact</Link></li>
                                <li>MY ACCOUNT</li>
                            </ul>
                        </div>
                        :
                        <div className='tab-bar' onClick={() => setBar(!bar)}>
                            <h2><FaBars /></h2>
                        </div>}
                </div>
            </nav>

            <div className='search-hidden' hidden={showSearch ? false : true}
                onClick={() => {
                    setShowSearch(false)
                    setInputSearch(false)
                }}>
            </div>

            <div className='list-search' hidden={inputSearch ? false : true} >
                <div className='input-search' onClick={() => setShowSearch(true)}>
                    <input
                        type='text'
                        placeholder='Enter Search ...'
                        onChange={(e) => setTextSearch(e.target.value)}
                        onFocus={() => setList(true)} />
                </div>
                {
                    list ? <div className='list-search-product'>
                        <Item ProductsSearch={ProductsSearch} HandleClickDetail={HandleClickDetail} />
                    </div> : <div></div>
                }
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/News" element={<News />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Detail/:id" element={<Detail />} />

                <Route path="/Auth/Category" element={<Category />} />
                <Route path="/Auth/Product" element={<Product />} />

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

            <footer >
                <div className='container-footer width-1200 '>
                    <div>
                        <h2>MONDAY</h2>
                        <p></p>
                        <ul>
                            <li><FaFacebookF /></li>
                            <li><FaYoutube /></li>
                            <li><FaLinkedin /></li>
                            <li><FaInstagram /></li>
                        </ul>
                    </div>
                    <div>
                        <h2>SPORT SNEAKER</h2>
                        <ul>
                            <li>Home</li>
                            <li>Shop</li>
                            <li>News</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h2>SUPPORT</h2>
                        <ul>
                            <li>
                                <i><AiOutlineEnvironment /></i>
                                Trảng Dài- Biên Hòa - Đồng Nai
                            </li>
                            <li>
                                <i><AiOutlinePhone /></i>
                                +84 817 222 222
                            </li>
                            <li>
                                <i><AiOutlineMail /></i>
                                mondaysport@sneaker.com
                            </li>
                            <li>
                                <i><FaFirefox /></i>
                                mondaysportsneaker.com.vn
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}
