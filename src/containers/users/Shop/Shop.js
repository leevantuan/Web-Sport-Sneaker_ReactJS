import React, { useState } from 'react';
import "./Shop.scss";
import "../../../components/body.scss"

import Product from '../../../components/product';

import { useSelector } from 'react-redux';

export default function Shop() {

    const Products = useSelector((state) => state.products)

    const [ProductItems, setProductItems] = useState(Products);
    const [ProductCategory, setProductCategory] = useState("");

    const HandleChange = (data) => {
        switch (data) {
            case 'All':
                setProductItems(Products)
                return ProductItems;
            case 'Price-1':
                setProductItems(Products.filter((state) => state.price < 200))
                return ProductItems;
            case 'Price-2':
                setProductItems(Products.filter((state) => state.price > 200 && state.price < 251))
                return ProductItems;
            case 'Price-3':
                setProductItems(Products.filter((state) => state.price > 250 && state.price < 301))
                return ProductItems;
            case 'Price-4':
                setProductItems(Products.filter((state) => state.price > 300 && state.price < 351))
                return ProductItems;
            case 'Price-5':
                setProductItems(Products.filter((state) => state.price > 351))
                return ProductItems;
            default:
                return ProductItems;
        }
    }

    return (
        <main>
            <div className='container-shop width-1200'>
                <div className='left-container'>
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
                </div>
                <div className='right-container'>
                    {ProductItems.map((e) => {
                        return (
                            <Product key={e.id} img={e.img} name={e.name} price={e.price} category={e.category} />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
