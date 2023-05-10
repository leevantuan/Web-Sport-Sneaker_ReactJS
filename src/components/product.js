import React from 'react';
import './body.scss'
import './product.scss'
import { FaRegStar } from "react-icons/fa";


export default function Product(props) {
    return (

        <div className='item'>
            <img src={props.img} alt='' />
            <h3>{props.name}</h3>
            <span>
                <p>$ {props.price}</p>
                <ul>
                    <li><FaRegStar /></li>
                    <li><FaRegStar /></li>
                    <li><FaRegStar /></li>
                    <li><FaRegStar /></li>
                    <li><FaRegStar /></li>
                </ul>
            </span>
        </div>
    )
}