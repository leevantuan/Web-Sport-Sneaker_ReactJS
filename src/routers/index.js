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

export default function Index() {
    const [bar, setBar] = useState(false)
    const [home, setHome] = useState(true)
    const [shop, setShop] = useState(false)
    const [news, setNews] = useState(false)
    const [contact, setContact] = useState(false)

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
                            className={home ? 'menu-item box-sizing active' : 'menu-item box-sizing'}
                            onClick={() => {
                                setHome(true)
                                setShop(false)
                                setNews(false)
                                setContact(false)
                            }}
                        ><Link className='link' to="/">Home</Link></li>
                        <li
                            className={shop ? 'menu-item box-sizing active' : 'menu-item box-sizing'}
                            onClick={() => {
                                setHome(false)
                                setShop(true)
                                setNews(false)
                                setContact(false)
                            }}
                        ><Link className='link' to="/Shop">Shop</Link></li>
                        <li
                            className={news ? 'menu-item box-sizing active' : 'menu-item box-sizing'}
                            onClick={() => {
                                setHome(false)
                                setShop(false)
                                setNews(true)
                                setContact(false)
                            }}
                        ><Link className='link' to="/News">News</Link></li>
                        <li
                            className={contact ? 'menu-item box-sizing active' : 'menu-item box-sizing'}
                            onClick={() => {
                                setHome(false)
                                setShop(false)
                                setNews(false)
                                setContact(true)
                            }}
                        ><Link className='link' to="/Contact">Contact</Link></li>
                    </ul>
                    <ul className='search dsFlex'>
                        <li className='box-sizing'> <AiOutlineSearch /> </li>
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

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/News" element={<News />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Detail/:id" element={<Detail />} />
            </Routes>

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
