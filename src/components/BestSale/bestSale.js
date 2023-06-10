import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bestSale.scss"

import { FaRegStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "../../routers/axiosCustom"

import { Link } from 'react-router-dom';

class BestSale extends React.Component {

    constructor(props) {
        super(props);
        this.state = { products: [], isLoading: false };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ isLoading: true });
        await axios.get('/products').then((res) => this.setState({ products: res.data.data, isLoading: false }))
    }

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
                    {this.state.products.map((e) => {
                        return (
                            <Link key={e.id} className="link-sale" to={`/Detail/${e.id}`} >
                                <div className="best-sale-item">
                                    <img src={e.Image} alt="" />
                                    <h2>{e.Name}</h2>
                                    <span>
                                        <p>$ {e.Price}</p>
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
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}

export default BestSale;
