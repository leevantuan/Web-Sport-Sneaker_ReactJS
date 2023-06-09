import React from 'react'
import "./Item.scss"

import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Item({ ProductsSearch, HandleClickDetail }) {
    return (
        <>
            {
                ProductsSearch.map((props) => (
                    <Link key={props.id} className='list-search-item' to={`/Detail/${props.id}`} onClick={() => HandleClickDetail()} >
                        <div className='left-list-search-item'>
                            <img src={props.Image} alt='' />
                        </div>
                        <div className='right-list-search-item'>
                            <h3>{props.Name}</h3>
                            <span>
                                <h4>$ {props.Price}</h4>
                                <ul>
                                    <li><FaStar /></li>
                                    <li><FaStar /></li>
                                    <li><FaStar /></li>
                                    <li><FaStar /></li>
                                    <li><FaStar /></li>
                                </ul>
                            </span>
                        </div>
                    </Link>
                ))
            }
        </>
    )
}
