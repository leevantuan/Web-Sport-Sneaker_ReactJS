import React from 'react';
import '../../components/body.scss'
import './sale.scss'
import { FaRegStar } from "react-icons/fa";

import { Link } from 'react-router-dom';

export default function Sale(props) {
    return (

        <Link className='item' to={`/Detail/${props.id}`}>
            <img src={props.img} alt='' />
            <h3>{props.name}</h3>
            <span>
                <p>$ {props.price * 0.8}  <i>${props.price}</i></p>
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
