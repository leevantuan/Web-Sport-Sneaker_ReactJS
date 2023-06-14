import React, { useEffect, useState } from 'react';
import '../../../components/body.scss'
import './Home.scss';

import { FaRegHandPointRight } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import Banner from '../../../components/Banner/banner';
import Sale from '../../../components/Sale/sale';
import BestSale from '../../../components/BestSale/bestSale';

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';
import axios from 'axios';


import { GetProduct } from "../../../routers/API";
export default function Home() {

    const [loading, setLoading] = useState(false)
    const [ListProducts, setListProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            await axios.get(GetProduct).then((res) => setListProducts(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchProduct();
    }, [loading])

    const ProductsSale = ListProducts.filter((e) => e.Sale === 1)

    return (
        <div className='container'>
            <Header />
            <main>
                <div className='banner'>
                    <Banner />
                </div>

                <div className='bgc'>
                    <div className='contact'>
                        <div className='contact-item text-center box-sizing'>
                            <i><FaThumbsUp /></i>
                            <h2>GENUINE COMMITMENT</h2>
                            <h3>100 % Authentic</h3>
                            <p>Committed to genuine products from Europe, America..</p>
                        </div>
                        <div className='contact-item text-center box-sizing'>
                            <i><FaShippingFast /></i>
                            <h2>EXPRESS DELIVERY</h2>
                            <h3>EXPRESS DELIVERY</h3>
                            <p>Express SHIP 1 hour to receive goods in the inner city</p>
                        </div>
                        <div className='contact-item text-center box-sizing'>
                            <i><FaHeadset /></i>
                            <h2>SUPPORTING 24/7</h2>
                            <h3>SUPPORTING 24/7</h3>
                            <p>Call now</p>
                        </div>
                    </div>
                </div>

                <div className='container-sale width-1200 mTop-60'>
                    <h1><i><FaRegHandPointRight /></i>DISCOUNT TO LOSSES</h1>
                    <p>From 05/05/2023 to 02/02/2024.</p>
                    <div data-aos="fade-up-right" data-aos-duration="1000" className='content-sale'  >
                        <div className='img-sale'>
                            <img src={require('../../../assets/SALE.png')} alt='sale 20%' />
                        </div>
                        <div className='product-sale' data-aos="fade-up-left" data-aos-duration="1000">
                            {ProductsSale.map((e) => {
                                return (
                                    <Sale key={e.id} img={e.Image} name={e.Name} price={e.Price} id={e.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='best-sale width-1200 mTop-60'>
                    <h1><i><FaRegHandPointRight /></i>BEST SELLER OF THE MONTH</h1>
                    <p>From 05/05/2023 to 02/02/2024.</p>
                    <div className='best-sale-slider mTop-60' data-aos="fade-up" data-aos-duration="1000">
                        <BestSale />
                    </div>
                </div>

                <div className='container-coming width-1200'>
                    <h1><i><FaRegHandPointRight /></i>COMING SOON</h1>
                    <p>From 01/02/2023 to 02/02/2024.</p>
                    <div className='content-coming'>
                        <div className='left-coming'>
                            <div className='top-coming p-relative' data-aos="fade-up" data-aos-duration="1000" >
                                <img src={require("../../../assets/comingsoon.png")} alt='coming soon one' />
                                <div></div>
                                <h2 className='p-absolute'>Nike A Ma Maniére x Air 1 High 'Airness'</h2>
                                <p>COMING SOON</p>
                            </div>
                            <div className='bottom-coming p-relative' data-aos="fade-up" data-aos-duration="1000" >
                                <img src={require("../../../assets/comingsoon-2.png")} alt='coming soon two' />
                                <div></div>
                                <h2 className='p-absolute'>Nike Air 1 Retro High 'Lost And Found'</h2>
                                <p>COMING SOON</p>
                            </div>
                        </div>
                        <div className='right-coming p-relative' data-aos="fade-up" data-aos-duration="1000" >
                            <img src='https://product.hstatic.net/1000282067/product/nike-air-jordan-1-high-zoom-cmft-stadium-green-ct0978-300-mood-3_7c6d6a69c6694a16ab252eadb0298d24_1024x1024.png' alt='news' />
                            <div className='text-coming p-absolute'>
                                <h3>SNEAKER NEWS , FASHION UPDATE 24H</h3>
                                <h2>CHOOSE THE MOST POPULAR JODAN SNEAKER SIZE FOR NEWS MEMBER.</h2>
                                <div>
                                    <i><FaRegClock /></i>
                                    01/01/2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='news width-1200'>
                    <h1><i><FaRegHandPointRight /></i>NEWS</h1>
                    <p>TODAY 05/05/2023.</p>
                    <div className='content-news mTop-60'>
                        <div className='news-item dsFlex ' data-aos="zoom-in" data-aos-duration="1000" >
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-21/455x303/-nong-bong-cu-1681985083-231-width640height800-1682042006-599-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Rời giảng đường, cô giáo 9X mặc sành điệu, khoe dáng khó ai bì kịp</h2>
                                <p>Park Hyun Seo và Sarah Kim là hai giáo viên nổi tiếng nhất mạng xã hội Hàn Quốc.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-23/455x303/1682226351-26-thumbnail-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Tiểu thư RMIT, Lan Ngọc đẹp với trang phục có cúp mỏng</h2>
                                <p>Tiểu thư RMIT Đà Nẵng, Ninh Dương Lan Ngọc diện váy áo có phần cúp siêu nhỏ gợi cảm không hề phô.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/455x303/1682678062-795-thumbnail-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Mẹo mặc đẹp giúp bạn sành điệu mà không tốn một xu</h2>
                                <p>Loạt tips thời trang giúp bạn có được vẻ ngoài hấp dẫn hơn không tốn kém.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-24/455x303/01-1682305454-526-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>4 kiểu mốt dễ khiến bạn trông già hơn</h2>
                                <p>Các item đỏ trầm dễ khiến bạn già hơn so với tuổi thật trong khi nếu là đỏ tươi, diện mạo của bạn có thể trở nên sến sẩm.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-29/455x303/5120254_2301476356823248_4914088223287803904_n-1682774144-626-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Thanh Bi, Mai Thỏ đổi style vẫn khoe được dáng đẹp</h2>
                                <p>Tiết chế gu ăn mặc, 2 người đẹp này nhận về nhiều lời khen ngợi của người hâm mộ.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-24/455x303/42606280_786984189624755_6826148164564091236_n-1682317790-178-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Style mùa hè hút mọi ánh nhìn của phái đẹp châu Á</h2>
                                <p>Váy lụa được mỹ nhân Việt ưu tiên mặc trong mùa hè này.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                        <div className='news-item dsFlex mTop-60' data-aos="zoom-in" data-aos-duration="1000">
                            <img src="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-21/455x303/2-1682065071-683-width740height555_anh_cat_3_2.jpg" alt='' />
                            <span>
                                <p><i><FaRegClock /></i>05/05/2023</p>
                                <h2>Rời bản tin thể thao, nữ MC khoe dáng nóng bỏng nhưng không đi quá giới hạn</h2>
                                <p>Gwak Min Seon và Jin Dal Rae sở hữu gương mặt xinh như búp bê, vóc dáng đẹp.</p>
                                <div>
                                    <p>
                                        <i><FaRegUser /></i>
                                        Lê Văn Tuấn
                                    </p>
                                    <p>
                                        <i><FaRegHeart /></i>
                                        1k
                                    </p>
                                    <p>
                                        <i><FaRegCommentDots /></i>
                                        1k
                                    </p>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

        </div>

    )
}
