import React, { useEffect, useState } from 'react';
import './body.scss'
import './product.scss'

import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import axios from "axios";

import { GetCategory } from "../routers/API";
export default function Product(props) {
    const [category, setCategory] = useState("");
    useEffect(() => {
        const fetchCategory = async () => {
            await axios.get(GetCategory).then((res) => {
                const ListCategory = (res.data.data);
                let Category = ListCategory.find(e => e.id === props.category)
                setCategory(Category.CategoryName);
            }
            ).catch((error) => console.log(error));
        }
        fetchCategory();
    }, [props.category])

    return (
        <Link className='item' to={`/Detail/${props.id}`}>
            <img src={props.img} alt='' />
            <h3>{props.name}</h3>
            <p>{category}</p>
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