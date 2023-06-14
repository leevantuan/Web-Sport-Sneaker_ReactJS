import React, { useEffect, useState } from 'react';
import "./Shop.scss";
import "../../../components/body.scss";

import Product from '../../../components/product';
import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';
import axios from 'axios';
import ReactPaginate from 'react-paginate'

import { GetProduct, GetCategory } from "../../../routers/API";
export default function Shop() {

    const [loading, setLoading] = useState(false)
    const [ListProducts, setListProducts] = useState([]);
    const [ListCategories, setListCategories] = useState([]);
    const [ProductCategory, setProductCategory] = useState();
    const [PriceFrom, setPriceFrom] = useState(0);
    const [PriceTo, setPriceTo] = useState(99999);
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
    //API
    useEffect(() => {
        setLoading(true);
        const fetchCategory = async () => {
            await axios.get(GetCategory)
                .then((res) => setListCategories(res.data.data))
                .catch((error) => console.log(error))
        }
        setLoading(false)
        fetchCategory();
    }, [loading])

    //Filter Products
    const HandleChange = (data) => {
        switch (data) {
            case 'All':
                setPriceFrom(0);
                setPriceTo(99999)
                break;
            case 'Price-1':
                setPriceFrom(0);
                setPriceTo(200)
                break;
            case 'Price-2':
                setPriceFrom(200);
                setPriceTo(501)
                break;
            case 'Price-3':
                setPriceFrom(500);
                setPriceTo(1001)
                break;
            case 'Price-4':
                setPriceFrom(1000);
                setPriceTo(99999)
                break;
            default:
                return ListProducts;
        }
    }

    const ProductItems = ListProducts.filter((state) => {
        if (ProductCategory) {
            return state.Price > PriceFrom && state.Price < PriceTo && state.CategoryId == ProductCategory
        }
        return state.Price > PriceFrom && state.Price < PriceTo
    });

    //Sort Products
    const options = [
        { id: "1", value: "DEFAULT" },
        { id: "2", value: "Price Low - Hight" },
        { id: "3", value: "Price Hight - Low" },
    ]

    const [sort, setSort] = useState(options[0].value);
    let ProductSort = ProductItems;
    const HandleChangeSort = (data) => {
        setSort(data.target.value);
    }
    if (sort === "Price Low - Hight") {
        ProductSort = [...ProductItems].sort((a, b) => a.Price - b.Price);
    }
    else if (sort === "Price Hight - Low") {
        ProductSort = [...ProductItems].sort((a, b) => b.Price - a.Price);
    } else {
        ProductSort = ProductItems;
    }
    //remove filter
    const RemoveFilter = () => {
        window.location.reload();
    }
    //Pagination
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(12);
    let totalPage = Math.ceil(ProductSort.length / currentLastPage)
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentProducts = ProductSort.slice(indexOfFistPost, indexOfLastPost);
    const handlePageClick = (event) => {
        setNumberPage(event.selected + 1);
    }

    return (
        <div className='container'>
            <Header />
            <main>
                <div className='container-shop width-1200'>
                    <div className='left-container'>
                        <div className='sort'>
                            <select value={sort} onChange={HandleChangeSort}>
                                {options.map((e) => {
                                    return (
                                        <option key={e.id} value={e.value}>{e.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='price'>
                            <h2>Price</h2>
                            <div>
                                <input type='radio' name='Price' value={"All"} onChange={() => HandleChange("All")} />
                                <p>All</p>
                            </div>
                            <div>
                                <input type='radio' name='Price' value={"Price-1"} onChange={() => HandleChange("Price-1")} />
                                <p>From $ 0 to $ 200</p>
                            </div>
                            <div>
                                <input type='radio' name='Price' value={"Price-2"} onChange={() => HandleChange("Price-2")} />
                                <p>From $ 201 to $ 500</p>
                            </div>
                            <div>
                                <input type='radio' name='Price' value={"Price-3"} onChange={() => HandleChange("Price-3")} />
                                <p>From $ 501 to $ 1000</p>
                            </div>
                            <div>
                                <input type='radio' name='Price' value={"Price-5"} onChange={() => HandleChange("Price-4")} />
                                <p>From $ 1001 and up</p>
                            </div>
                        </div>
                        <div className='category'>
                            <h2>Category</h2>
                            <div>
                                <input type='radio' name='Category' value={""} onChange={() => setProductCategory("")} />
                                <p>All</p>
                            </div>
                            {
                                ListCategories.map((e) => {
                                    return (
                                        <div key={e.id}>
                                            <input type='radio' name='Category' value={e.id} onChange={(e) => setProductCategory(e.target.value)} />
                                            <p>{e.CategoryName}</p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='remove-filter' onClick={RemoveFilter}>
                            <p>REMOVE FILTER</p>
                        </div>
                    </div>
                    <div className='right-container'>
                        {CurrentProducts.map((e) => {
                            return (
                                <Product key={e.id} img={e.Image} name={e.Name} price={e.Price} category={e.CategoryId} id={e.id} />
                            )
                        })}

                    </div>

                </div>
                <div className='page-products'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}

                        marginPagesDisplayed={2}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active-paginate"
                    />
                </div>
            </main>
            <Footer />
        </div>

    )
}
