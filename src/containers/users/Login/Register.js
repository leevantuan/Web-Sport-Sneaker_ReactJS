import React, { useState } from 'react'
import './Register.scss'
import axios from 'axios';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

export default function Register() {

  let navigate = useNavigate();

  const [PhoneText, setPhoneText] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [NameText, setNameText] = useState("");

  const [ShowPassword, setShowPassword] = useState(false);

  const RoleID = "user";

  const HandleClickRegister = async () => {

    const { data } = await axios.post('http://localhost:8080/create-users', { Name: NameText, Phone: PhoneText, PassWord: PassWord, RoleID: RoleID });

    if (data) {
      toast.error(data.message)
    }
    if (data.message === "success") {
      setPhoneText("");
      setPassWord("");
      setNameText("");
      navigate("/", { replace: true });
    }

  }

  const HandleClickLogin = () => {
    navigate("/", { replace: true });
  }
  return (
    <div className='container-register'>
      <main className='content-register'>
        <div className='input-register'>
          <h2>REGISTER</h2>
          <label>Name:</label> < br />
          <input type='text' placeholder='Enter name ....' onChange={(e) => setNameText(e.target.value)} />
          <p >Maximum password is 20 length and no special characters.</p>
          <label>Phone Number:</label> < br />
          <input type='text' placeholder='Enter phone number ....' onChange={(e) => setPhoneText(e.target.value)} />
          <label>Pass Word:</label> < br />
          <div className='input-password'>
            <input type={ShowPassword ? 'text' : 'password'} placeholder='Enter Password ....' onChange={(e) => setPassWord(e.target.value)} />
            {
              ShowPassword ?
                <i onClick={() => setShowPassword(!ShowPassword)}><FaEye /></i> :
                <i onClick={() => setShowPassword(!ShowPassword)}><FaEyeSlash /></i>
            }
            <p >Minimum password is 8 length.</p>
          </div>
          <div className='btn-login-register'>
            <button onClick={() => HandleClickLogin()}>LOGIN</button>
            <button onClick={() => HandleClickRegister()}>REGISTER</button>
          </div>
        </div>
      </main>
    </div>
  )
}
