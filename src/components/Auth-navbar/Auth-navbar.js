import React, { useEffect } from 'react'
import "./AuthNavbar.scss"

import { Link } from 'react-router-dom';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

import isLoginAuth from '../../containers/auth/isLoginAuth';

export default function AuthNavbar() {

    let navigate = useNavigate();

    let check = isLoginAuth();

    useEffect(() => {
        const fetchUser = async () => {
            await axios.post("http://localhost:8080/check-admin", {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` },
                }).then((res) => {

                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchUser();
    }, [])

    const HandleClickLogout = () => {
        localStorage.removeItem("tokenAdmin");
        navigate("/Auth", { replace: true });
    }
    if (check) {
        return (
            <div className='container-auth-navbar'>
                <div className='auth-navbar' >
                    <ul>
                        <li><Link className="link-auth-navbar" to="/Auth/Product">Product</Link></li>
                        <li><Link className="link-auth-navbar" to="/Auth/Category">Category</Link></li>
                        <li><Link className="link-auth-navbar" to="/Auth/Image">Image</Link></li>
                        <li><Link className="link-auth-navbar" to="/Auth/User">User</Link></li>
                        <li><Link className="link-auth-navbar" to="/Auth/Cart">Cart</Link></li>
                        <li><Link className="link-auth-navbar" to="/Auth/User">Order</Link></li>
                        <li><span className="link-auth-navbar active-auth" onClick={() => HandleClickLogout()}>Logout</span></li>
                    </ul>
                </div >
            </div >
        )
    }
    else {
        return (
            <></>
        )
    }
}
