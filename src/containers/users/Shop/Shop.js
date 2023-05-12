import React, { useState } from 'react';
import "./Shop.scss";
import "../../../components/body.scss"

import Product from '../../../components/product';

import { useSelector } from 'react-redux';

export default function Shop() {

    const Products = useSelector((state) => state.products)

    const [ProductCategory, setProductCategory] = useState("");
    const [PriceFrom, setPriceFrom] = useState(0);
    const [PriceTo, setPriceTo] = useState(1000);

    const HandleChange = (data) => {
        switch (data) {
            case 'All':
                setPriceFrom(0);
                setPriceTo(1000)
                break;
            case 'Price-1':
                setPriceFrom(0);
                setPriceTo(200)
                break;
            case 'Price-2':
                setPriceFrom(200);
                setPriceTo(251)
                break;
            case 'Price-3':
                setPriceFrom(250);
                setPriceTo(301)
                break;
            case 'Price-4':
                setPriceFrom(300);
                setPriceTo(351)
                break;
            case 'Price-5':
                setPriceFrom(351);
                setPriceTo(1000)
                break;
            case 'Category':
                setProductCategory("")
                return setProductCategory;
            case 'Jordan 1 Mid 2023':
                setProductCategory("Jordan 1 Mid 2023")
                return setProductCategory;
            case 'Jordan 1 High 2023':
                setProductCategory("Jordan 1 High 2023")
                return setProductCategory;
            case 'Jordan 1 Zoom 2023':
                setProductCategory("Jordan 1 Zoom 2023")
                return setProductCategory;
            default:
                return Products;
        }
    }

    const ProductItems = Products.filter((state) => state.price > PriceFrom && state.price < PriceTo && state.category.includes(ProductCategory));

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
        ProductSort = [...ProductItems].sort((a, b) => a.price - b.price);
    }
    else if (sort === "Price Hight - Low") {
        ProductSort = [...ProductItems].sort((a, b) => b.price - a.price);
    } else {
        ProductSort = ProductItems;
    }

    const RemoveFilter = () => {
        window.location.reload();
    }
    return (
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
                            <p>From $ 201 to $ 250</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-3"} onChange={() => HandleChange("Price-3")} />
                            <p>From $ 251 to $ 300</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-4"} onChange={() => HandleChange("Price-4")} />
                            <p>From $ 301 to $ 350</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-5"} onChange={() => HandleChange("Price-5")} />
                            <p>From $ 351 and up</p>
                        </div>
                    </div>
                    <div className='category'>
                        <h2>Category</h2>
                        <div>
                            <input type='radio' name='Category' value={"All"} onChange={() => HandleChange("Category")} />
                            <p>All</p>
                        </div>
                        <div>
                            <input type='radio' name='Category' value={"Jordan 1 Mid 2023"} onChange={() => HandleChange("Jordan 1 Mid 2023")} />
                            <p>Jordan 1 Mid 2023</p>
                        </div>
                        <div>
                            <input type='radio' name='Category' value={"Jordan 1 High 2023"} onChange={() => HandleChange("Jordan 1 High 2023")} />
                            <p>Jordan 1 High 2023</p>
                        </div>
                        <div>
                            <input type='radio' name='Category' value={"Jordan 1 Zoom 2023"} onChange={() => HandleChange("Jordan 1 Zoom 2023")} />
                            <p>Jordan 1 Zoom 2023</p>
                        </div>
                    </div>
                    <div className='remove-filter' onClick={RemoveFilter}>
                        <p>REMOVE FILTER</p>
                    </div>
                </div>
                <div className='right-container'>
                    {ProductSort.map((e) => {
                        return (
                            <Product key={e.id} img={e.img} name={e.name} price={e.price} category={e.category} id={e.id} />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
