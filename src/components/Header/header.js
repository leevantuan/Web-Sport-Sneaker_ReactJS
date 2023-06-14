import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../components/body.scss'
import './header.scss';
import Item from '../../components/ItemSearch/Item';

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import { GetProduct, GetCart, Check_Login_Users, PPD_Cart } from "../../routers/API";

export default function Header() {
    let navigate = useNavigate();
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [textSearch, setTextSearch] = useState("")

    const [loading, setLoading] = useState(false)
    const [bar, setBar] = useState(false)
    const [myAccount, setMyAccount] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [inputSearch, setInputSearch] = useState(false)
    const [list, setList] = useState(false)
    const [ListProducts, setListProducts] = useState([]);
    const [ListCarts, setListCarts] = useState([]);

    //API
    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            await axios.get(GetProduct)
                .then((res) => setListProducts(res.data.data))
                .catch((error) => console.log(error))
        }
        setLoading(false)
        fetchProduct();
    }, [loading])

    const ProductsSearch = ListProducts.filter((e) => e.Name.includes(textSearch))
    //API
    useEffect(() => {
        setLoading(true);
        const fetchCart = async () => {
            await axios.get(GetCart)
                .then((res) => setListCarts(res.data.data))
                .catch((error) => console.log(error))
        }
        setLoading(false)
        fetchCart();
    }, [loading])
    //API
    useEffect(() => {
        const fetchUser = async () => {
            await axios.post(Check_Login_Users, {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }).then((res) => {
                    setName(res.data.data.data.Name)
                    setPhone(res.data.data.data.Phone)
                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchUser();
    }, [])
    //filter cart with user phone number
    const [ProductsCart, setProductsCart] = useState([]);
    const [TotalCart, setTotalCart] = useState(0);
    const [CountCart, setCountCart] = useState(0);
    useEffect(() => {
        const List = ListCarts.filter((cart) => cart.Phone === Phone && cart.Status === 1)
        const ListProductID = List.map((id) => id.ProductID)
        setProductsCart(ListProductID.map((event) => ListProducts.find((item) => item.id === event)));
    }, [ListCarts, ListProducts, Phone])

    useEffect(() => {
        setLoading(true);
        const ListPriceCart = ProductsCart.map((event) => event.Price)
        if (ListPriceCart) {
            let TotalCart = 0;
            for (var i = 0; i < ListPriceCart.length; i++) {
                let Price = ListPriceCart[i];
                TotalCart = TotalCart + Price;
            }
            setCountCart(ProductsCart.length)
            setTotalCart(TotalCart)
            setLoading(false);
        }
        setLoading(false);
    }, [loading, ProductsCart])
    const HandleClickLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
        setMyAccount(false);
    }
    const HandleClickLogin = () => {
        navigate("/", { replace: true });
        setMyAccount(false);
    }
    const HandleClickMyAccount = () => {
        navigate("/Account", { replace: true });
        setMyAccount(false);
    }
    const HandleClickDetail = () => {
        setShowSearch(false)
        setInputSearch(false)
    }
    //API
    const HandleDeleteACart = async (event) => {

        let List = ListCarts.filter((cart) => cart.Phone === Phone)

        let ProductRemove = List.find((e) => e.ProductID === event)

        setLoading(true)
        await axios.delete(PPD_Cart, { data: { id: ProductRemove.id } });
        setLoading(false)

        toast.success(`Delete success!`);
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
                        <li className='box-sizing' onClick={() => {
                            setMyAccount(!myAccount)
                            setShowCart(false)
                        }}>
                            <AiOutlineUser />
                            {
                                myAccount ?
                                    Name === "" ?
                                        <ul className='modal-account'>
                                            <li onClick={() => HandleClickLogin()}>Login</li>
                                        </ul>
                                        :
                                        <ul className='modal-account'>
                                            <li onClick={() => HandleClickMyAccount()}>{Name}</li>
                                            <li onClick={() => HandleClickLogout()}>Logout</li>
                                        </ul>
                                    : ""
                            }
                        </li>
                        <li className='box-sizing' onClick={() => {
                            setLoading(!loading);
                            setShowCart(!showCart);
                            setMyAccount(false);
                        }}>
                            <AiOutlineShoppingCart />
                            <span>{CountCart}</span>
                            {
                                showCart ?
                                    <ul className='my-cart'>
                                        {
                                            ProductsCart.map((e) => {
                                                return (
                                                    <li key={e.id}>
                                                        <img src={e.Image} alt='' />
                                                        <span>
                                                            <h3>{e.Name}</h3>
                                                            <div>
                                                                <h4>$ {e.Price}</h4>
                                                                <i onClick={() => HandleDeleteACart(e.id)}><FaRegTrashAlt /></i>
                                                            </div>
                                                        </span>
                                                    </li>
                                                )
                                            })
                                        }

                                        <div className='view-cart-link'>
                                            <Link to="/ViewCart">View cart</Link>
                                            <p>Total: $ {TotalCart}</p>
                                        </div>
                                    </ul> :
                                    ""
                            }

                        </li>
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
