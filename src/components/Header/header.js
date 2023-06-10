import React, { useEffect, useState } from 'react';
import '../../components/body.scss'
import './header.scss'

import { Link } from 'react-router-dom';

import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

import Item from '../../components/ItemSearch/Item';
// import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Header() {

    let navigate = useNavigate();
    const [Name, setName] = useState("")

    const [bar, setBar] = useState(false)
    const [myAccount, setMyAccount] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [inputSearch, setInputSearch] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [list, setList] = useState(false)

    const [loading, setLoading] = useState(false)
    const [ListProducts, setListProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            await axios.get('http://localhost:8080/API/products').then((res) => setListProducts(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchProduct();
    }, [loading])

    const ProductsSearch = ListProducts.filter((e) => e.Name.includes(textSearch))

    useEffect(() => {
        const fetchUser = async () => {
            await axios.post("http://localhost:8080/check-user", {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }).then((res) => {
                    setName(res.data.data.data.Name)

                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchUser();
    }, [])

    const HandleClickLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
        setMyAccount(false);
    }
    const HandleClickLogin = () => {
        navigate("/", { replace: true });
        setMyAccount(false);
    }

    const HandleClickDetail = () => {
        setShowSearch(false)
        setInputSearch(false)
    }
    return (
        <>
            <nav>
                <div className='nav-container dsFlex justify-between width-1200'>
                    <div className='logo dsFlex'>
                        <img src={require('../../assets/logo.png')} alt='logo' />
                        <h1> Monday.</h1>
                    </div>
                    <ul className='menu dsFlex justify-between box-sizing'>
                        <li
                            className='menu-item box-sizing'
                        ><Link className='link' to="/Home">Home</Link></li>
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
                        <li className='box-sizing' onClick={() => setMyAccount(!myAccount)}>
                            <AiOutlineUser />
                            {
                                myAccount ?
                                    Name === "" ?
                                        <ul className='modal-account'>
                                            <li onClick={() => HandleClickLogin()}>Login</li>
                                        </ul>
                                        :
                                        <ul className='modal-account'>
                                            <li>{Name}</li>
                                            <li onClick={() => HandleClickLogout()}>Logout</li>
                                        </ul>
                                    : ""
                                // <ul className='modal-account'>
                                //     <li onClick={() => HandleClickLogin()}>Login</li>
                                // </ul>
                            }
                        </li>
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

            {/* <footer >
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
            </footer> */}
        </>
    )
}
