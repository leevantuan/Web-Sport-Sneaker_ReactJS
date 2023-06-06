import React from 'react'
import "./AuthNavbar.scss"

import { Link } from 'react-router-dom';

export default function AuthNavbar() {
    return (
        <div className='container-auth-navbar'>
            <div className='auth-navbar'>
                <ul>
                    <li><Link class="link-auth-navbar" to="/">Home Shop</Link></li>
                    <li><Link class="link-auth-navbar" to="/Auth/Product">Product</Link></li>
                    <li><Link class="link-auth-navbar" to="/Auth/Category">Category</Link></li>
                    <li><Link class="link-auth-navbar" to="/Auth/Image">Image</Link></li>
                    <li><Link class="link-auth-navbar" to="/Auth/User">User</Link></li>
                    <li><Link class="link-auth-navbar" to="/Auth/User">Order</Link></li>
                    <li><Link class="link-auth-navbar" to="">Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}
