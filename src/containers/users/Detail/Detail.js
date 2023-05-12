import React from 'react'
import "./Detail.scss"
import "../../../components/body.scss"
import { useParams } from 'react-router-dom';

export default function Detail() {
    const { id } = useParams();


    return (
        <div className='container-detail width-1200'>
            {id}
        </div>
    )
}
