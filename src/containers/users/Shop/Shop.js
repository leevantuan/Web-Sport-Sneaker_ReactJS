import React, { useState } from 'react';
import "./Shop.scss";
import "../../../components/body.scss"

import Product from '../../../components/product';

import { useSelector } from 'react-redux';

export default function Shop() {

    const Products = useSelector((state) => state.products)

    const HandleChange = (data) => {

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
                            <p>From $ 0 to $ 100</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-2"} onChange={() => HandleChange("Price-2")} />
                            <p>From $ 101 to $ 200</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-3"} onChange={() => HandleChange("Price-3")} />
                            <p>From $ 201 to $ 300</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-4"} onChange={() => HandleChange("Price-4")} />
                            <p>From $ 301 to $ 400</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-5"} onChange={() => HandleChange("Price-5")} />
                            <p>From $ 401 to $ 500</p>
                        </div>
                        <div>
                            <input type='radio' name='Price' value={"Price-6"} onChange={() => HandleChange("Price-6")} />
                            <p>From $ 500 and up</p>
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
                    {Products.map((e) => {
                        return (
                            <Product key={e.id} img={e.img} name={e.name} price={e.price} />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
