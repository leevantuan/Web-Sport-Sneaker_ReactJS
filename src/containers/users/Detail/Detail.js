import React from 'react'
import "./Detail.scss"
import "../../../components/body.scss"

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Detail() {
    const { id } = useParams();

    const Products = useSelector(state => state.products);

    const Product = Products.find((e) => e.id == id)

    const Image = Product.listImg;

    return (
        <div className='container-detail width-1200'>
            <div className='left-detail'>
                <h2>{Product.name}</h2>
                {Image.map((e) => (
                    <div className='img-detail' key={e.id}>
                        <div className='item-detail'>
                            <input name='img' type='radio' id={e.id} />
                            <img src={e.img} alt='' />
                        </div>
                    </div>
                ))}
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
            <div className='right-detail'></div>
        </div>
    )
}
