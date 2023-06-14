import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./banner.scss";
import "../body.scss";


class Banner extends React.Component {
    render() {
        var settings = {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div className='banner-img p-relative'>
                        <img
                            src={require("../../assets/banner1.png")}
                            alt="AIR JORDAN 1 HI TROPHY ROOM CHICAGO"
                            className="p-absolute"
                        />
                        <div className="left-banner p-absolute">
                            <h2>AIR JORDAN 1 HI TROPHY ROOM CHICAGO</h2>
                            <p>CÓ CHỮ KÝ CỦA JORDAN TRÊN PHẦN GÓT GIÀY</p>
                            <button>DETAIL NOW</button>
                        </div>
                    </div>
                    <div className='banner-img p-relative' >
                        <img
                            src={require("../../assets/banner2.png")}
                            alt="NIKE AIR TRAINER 1 SP"
                            className="p-absolute"
                        />
                        <div className="left-banner p-absolute">
                            <h2>NIKE JORDAN 1 MID OBSIDIAN CHICAGO</h2>
                            <p>NIKE AIR JORDAN 1 MID 'OBSIDIAN' 554724-174</p>
                            <button>DETAIL NOW</button>
                        </div>
                    </div>
                    <div className='banner-img p-relative' >
                        <img
                            src={require("../../assets/banner3.png")}
                            alt="NIKE AIR TRAINER 1 SP"
                            className="p-absolute"
                        />
                        <div className="left-banner p-absolute">
                            <h2>NIKE AIR JORDAN 1 MID SMOKE GREY CHICAGO</h2>
                            <p>Black/ White/Smoke Grey - SERIES: 554724-092</p>
                            <button>DETAIL NOW</button>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default Banner;
