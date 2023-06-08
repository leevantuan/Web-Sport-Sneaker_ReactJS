import React, { useEffect, useState } from 'react'
import './Login.scss'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LogoutUser() {

    const [Phone, setPhone] = useState("");
    const [Name, setName] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            await axios.post("http://localhost:8080/check-user", {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }).then((res) => {
                    setPhone(res.data.data.data.Phone)
                    setName(res.data.data.data.Name)

                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchUser();
    }, [])

    const HandleClickLogout = async () => {
        localStorage.removeItem("token");
        alert("Logout success");
        navigate("/", { replace: true });
    }

    return (
        <div className='container-login'>
            <main className='content-login'>
                <div className='input-login'>
                    <h2>LOGOUT</h2>
                    <label>Phone Number: {Phone}</label>
                    <label>Name: {Name}</label> <br />
                    <button onClick={() => HandleClickLogout()}>LOGOUT</button>
                </div>
            </main>
        </div>
    )
}
