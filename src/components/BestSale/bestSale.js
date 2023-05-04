import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bestSale.scss"

import { FaRegStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import data from "../../data/data";

class BestSale extends React.Component {

    render() {
        var settings = {
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    {data.map((e) => {
                        return (
                            <div key={e.id}>
                                <div className="best-sale-item">
                                    <img src={e.img} alt="" />
                                    <h2>{e.name}</h2>
                                    <span>
                                        <p>$ {e.price}</p>
                                        <ul>
                                            <li><FaRegStar /></li>
                                            <li><FaRegStar /></li>
                                            <li><FaRegStar /></li>
                                            <li><FaRegStar /></li>
                                            <li><FaRegStar /></li>
                                        </ul>
                                    </span>
                                    <span>
                                        <button>Add to cart</button>
                                        <i><FaHeart /></i>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}

export default BestSale;
