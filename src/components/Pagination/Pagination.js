import React from 'react'
import { Link } from 'react-router-dom';
import "./Pagination.scss"

export default function Pagination({ currentLastPage, totalPage, paginate }) {
    const PageNumber = [];

    for (let i = 1; i <= Math.ceil(totalPage / currentLastPage); i++) {
        PageNumber.push(i);
    }
    return (
        <div>
            <ul className='pagination'>
                {PageNumber.map((number) => (
                    <li key={number.id}>
                        <Link to="/Shop" className='page-link' onClick={() => paginate(number)}>{number}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
