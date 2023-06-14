import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Login_Users } from "../../../routers/API";
export default function LoginUser() {
    let navigate = useNavigate();
    const [PhoneText, setPhoneText] = useState("");
    const [PassWord, setPassWord] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);
    //API
    const HandleClickLogin = async () => {
        const { data } = await axios.post(Login_Users, { Phone: PhoneText, PassWord: PassWord });
        if (data.message === "success") {
            toast.success(data.message)
            localStorage.setItem("token", data.token);
            navigate("/Home", { replace: true });
        }
        else {
            toast.error(data.message)
        }
    }
    const HandleClickRegister = () => {
        navigate("/Register", { replace: true });
    }
    return (
        <div className='container-login'>
            <main className='content-login'>
                <img src={require('../../../assets/login.jpg')} alt='' />
                <div className='input-login'>
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
                    <div><Link className='link-forget'>Forget password?</Link></div>
                    <div className='btn-login-register'>
                        <button onClick={() => HandleClickRegister()}>REGISTER</button>
                        <button onClick={() => HandleClickLogin()}>LOGIN</button>
                    </div>
                </div>
            </main>
        </div>
    )
}
