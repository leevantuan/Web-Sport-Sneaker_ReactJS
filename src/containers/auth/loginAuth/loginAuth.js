import React, { useState } from 'react'
import './loginAuth.scss'
import axios from 'axios';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginAuth() {

    let navigate = useNavigate();

    const [PhoneText, setPhoneText] = useState("");
    const [PassWord, setPassWord] = useState("");

    const [ShowPassword, setShowPassword] = useState(false);

    const RoleID = "admin";

    const HandleClickLogin = async () => {

        const { data } = await axios.post('http://localhost:8080/login-admin', { Phone: PhoneText, PassWord: PassWord, RoleID: RoleID });
        if (data.message === "success") {
            toast.success(data.message)
            localStorage.setItem("tokenAdmin", data.token);
            navigate("/Auth/Product", { replace: true });
        }
        else {
            toast.error(data.message)
        }
    }

    return (
        <div className='container-loginAuth'>
            <main className='content-loginAuth'>
                <div className='input-loginAuth'>
                    <h2>LOGIN</h2>
                    <label>Phone Number:</label>
                    <input type='text' placeholder='Enter phone number ....' onChange={(e) => setPhoneText(e.target.value)} />
                    <label>Pass Word:</label>
                    <div className='input-password'>
                        <input type={ShowPassword ? 'text' : 'password'} placeholder='Enter Password ....' onChange={(e) => setPassWord(e.target.value)} />
                        {
                            ShowPassword ?
                                <i onClick={() => setShowPassword(!ShowPassword)}><FaEye /></i> :
                                <i onClick={() => setShowPassword(!ShowPassword)}><FaEyeSlash /></i>
                        }

                    </div>
                    <div className='btn-login-register'>
                        <button onClick={() => HandleClickLogin()}>LOGIN</button>
                    </div>
                </div>
            </main>
        </div>
    )
}
