import React, { useState } from 'react'
import "./Detail.scss"
import "../../../components/body.scss"

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FaStar } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';

export default function Detail() {
    const { id } = useParams();

    const Products = useSelector(state => state.products);

    const Product = Products.find((e) => e.id == id)

    const Image = Product.listImg;

    const [img, setImg] = useState(1)

    const ImageShow = Image.find(e => e.id == img)

    return (

        <div className='container'>
            <Header />
            <div className='container-detail width-1200'>
                <div className='product-detail'>
                    <div className='left-detail'>

                        <div className='img-detail-container'>
                            <img src={ImageShow.img} alt='' />
                        </div>

                        <div className='radio-choose'>
                            {Image.map((e) => (
                                <div className='img-detail' key={e.id}>
                                    <div className='item-detail'>
                                        <input name='img' type='radio' id={e.id} value={e.id} onChange={(e) => setImg(e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='list-choose-img'>
                            {Image.map((e) => (
                                <div className='img-detail-2' key={e.id}>
                                    <div className='choose-detail'>
                                        <label htmlFor={e.id}>
                                            <img src={e.img} alt='' />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='right-detail'>
                        <h2 style={{ color: "black" }}>{Product.name}</h2>
                        <div className='star'>
                            <u>4.8 </u>
                            <i><FaStar /></i>
                            <i><FaStar /></i>
                            <i><FaStar /></i>
                            <i><FaStar /></i>
                            <i><FaStar /></i>
                        </div>
                        <h2>Price: $ {Product.price} <span style={{ color: "grey", marginLeft: 10, textDecoration: "line-through" }}>$ {Product.price * 1.2}</span></h2>
                        <h3>Choose Size:</h3>
                        <ul>
                            <li>Order</li>
                            <li>40</li>
                            <li>41</li>
                            <li>42</li>
                            <li>43</li>
                            <li>44</li>
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
                            <button className='add-to-cart'>
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
