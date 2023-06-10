import React, { useEffect, useState } from 'react'
import "./Detail.scss"
import "../../../components/body.scss"

import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import { FaStar } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Detail() {
    const [loading, setLoading] = useState(false)
    const [isLogin, setISLogin] = useState(false)
    const [ListProducts, setListProducts] = useState([]);
    const [ListImages, setListImages] = useState([]);

    const [UserID, setUserID] = useState("");
    const [size, setSize] = useState(38);


    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            await axios.get('http://localhost:8080/API/products').then((res) => setListProducts(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchProduct();
    }, [loading])

    useEffect(() => {
        setLoading(true);
        const fetchImage = async () => {
            await axios.get('http://localhost:8080/API/images').then((res) => setListImages(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchImage();
    }, [loading])

    useEffect(() => {
        const fetchUser = async () => {
            await axios.post("http://localhost:8080/check-user", {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }).then((res) => {
                    if (res) {
                        setISLogin(true);
                        setUserID(res.data.data.data.id)
                    }

                }).catch((error) => {
                    console.log(error);
                    setISLogin(false);
                })
        }
        fetchUser();
    }, [])

    const { id } = useParams();

    const Product = ListProducts.find((e) => e.id == id)

    const [img, setImg] = useState(0)

    //size

    const ListSize = [
        { id: 1, size: 38 },
        { id: 2, size: 39 },
        { id: 3, size: 40 },
        { id: 4, size: 41 },
        { id: 5, size: 42 },
        { id: 6, size: 43 },
        { id: 7, size: 44 },
    ]

    const HandleAddToCart = async () => {
        setLoading(true)
        await axios.post('http://localhost:8080/API/create-a-cart', { UserID: UserID, ProductID: id, Size: size }).then((res) => {
            if (res.data.message) {
                toast.error(res.data.message)
            }
            else {
                toast.success("Add product to cart success!")
            }
        })
        setLoading(false)
    }

    if (isLogin === true) {
        if (Product) {
            const Images = ListImages.filter((e) => e.ProductId === Product.id)

            let ShowImg = "";
            if (img == 0) {
                ShowImg = Product.Image
            }
            else {
                let imgLink = Images.find((e) => e.id == img);
                ShowImg = imgLink.ImageLink;
            }
            return (
                <div className='container'>
                    <Header />
                    <div className='container-detail width-1200'>
                        <div className='product-detail'>
                            <div className='left-detail'>

                                <div className='img-detail-container'>
                                    <img src={ShowImg} alt='' />
                                </div>

                                <div className='radio-choose'>
                                    <div className='img-detail' >
                                        <div className='item-detail'>
                                            <input name='img' type='radio' id={0} value={0} onChange={(e) => setImg(e.target.value)} />
                                        </div>
                                    </div>
                                    {Images.map((e) => (
                                        <div className='img-detail' key={e.id}>
                                            <div className='item-detail'>
                                                <input name='img' type='radio' id={e.id} value={e.id} onChange={(e) => setImg(e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='list-choose-img'>
                                    <div className='img-detail-2' >
                                        <div className='choose-detail'>
                                            <label htmlFor={0}>
                                                <img src={Product.Image} alt='' />
                                            </label>
                                        </div>
                                    </div>
                                    {Images.map((e) => (
                                        <div className='img-detail-2' key={e.id}>
                                            <div className='choose-detail'>
                                                <label htmlFor={e.id}>
                                                    <img src={e.ImageLink} alt='' />
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='right-detail'>
                                <h2 style={{ color: "black" }}>{Product.Name}</h2>
                                <div className='star'>
                                    <u>4.8 </u>
                                    <i><FaStar /></i>
                                    <i><FaStar /></i>
                                    <i><FaStar /></i>
                                    <i><FaStar /></i>
                                    <i><FaStar /></i>
                                </div>
                                <h2>Price: $ {Product.Price} <span style={{ color: "grey", marginLeft: 10, textDecoration: "line-through" }}>$ {Product.Price * 1.2}</span></h2>
                                <h3>Choose Size:</h3>
                                <ul onClick={(e) => setSize(e.target.value)}>
                                    {
                                        ListSize.map((e) => {
                                            return (
                                                <li key={e.id} value={e.size} className={size == e.size ? "active-size" : ""} >{e.size}</li>
                                            )
                                        })
                                    }

                                </ul>
                                <div className='hotline'>
                                    Hotline:
                                    <span> 84+ 817 251 999</span>
                                </div>
                                <div className='hotline'>
                                    Email:
                                    <span>mondaysport@sneaker.com</span>
                                </div>
                                <div className='add'>
                                    <button className='add-to-cart' onClick={() => HandleAddToCart()}>
                                        Add To Cart
                                    </button>
                                    <button className='buy-now'>
                                        Buy Now
                                    </button>
                                </div>
                                <div className='detail-buy-now'>
                                    <div><i><FaSyncAlt /></i>Đổi trả trong vòng 7 ngày.</div>
                                    <div><i><FaShieldAlt /></i>Hàng chính hãng 100%.</div>
                                    <div><i><FaShippingFast /></i>Miễn phí ship trong khu vực.</div>
                                </div>
                            </div>
                        </div>
                        <div className='product-suggest'>
                        </div>
                    </div>
                    <Footer />
                </div>

            )
        }
        else {
            return (
                <h2>Error</h2>
            )
        }
    }
    else {
        return (
            <h1 style={{ width: "100vw", height: "100vh", display: "Flex", justifyContent: "center", alignItems: "center", fontSize: 50, margin: 0 }}><Link to="/" >Login, Please!</Link></h1>
        )
    }

}
