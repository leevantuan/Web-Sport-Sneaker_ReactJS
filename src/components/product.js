import React from 'react';
import './body.scss'
import './product.scss'

import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";

export default function Product(props) {
    return (
        <Link className='item' to={`/Detail/${props.id}`}>
            <img src={props.img} alt='' />
            <h3>{props.name}</h3>
            <p>{props.category}</p>
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
        </Link>
    )
}