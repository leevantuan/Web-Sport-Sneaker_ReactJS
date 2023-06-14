import React, { useEffect, useState } from 'react';
import './account.scss';

import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import axios from 'axios';

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';

import { GetProduct, GetCart, Check_Login_Users, GetOrder, PPD_Order } from "../../../routers/API";
export default function Account() {

    const [loading, setLoading] = useState(false);
    const [Order, setOrder] = useState([]);
    const [Cart, setCart] = useState([]);
    const [Product, setProduct] = useState([]);
    const [showRead, setShowRead] = useState(false);

    const [FindId, setFindId] = useState("")
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")

    //API
    useEffect(() => {
        const fetchUser = async () => {
            await axios.post(Check_Login_Users, {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }).then((res) => {
                    setName(res.data.data.data.Name)
                    setPhone(res.data.data.data.Phone)
                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchUser();
    }, [])
    //API
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetOrder);
            setOrder(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])
    //APi
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetCart);
            setCart(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])
    //API
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetProduct);
            setProduct(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    let FindOrder = [];
    let FindListCArt = [];
    if (FindId !== "") {
        FindOrder = Order.find((e) => e.id === FindId);
        FindListCArt = FindOrder.ListCart;
    }
    //list cart
    let ListCarts = FindListCArt.map((event) => Cart.find((e) => e.id === event))
    let ListProductID = ListCarts.map((event) => event.ProductID)
    //list product
    let ListProducts = ListProductID.map((event) => Product.find((e) => e.id === event))

    const HandleClickDetail = (event) => {
        setShowRead(true);
        setFindId(event.id);
    }
    //API
    const HandleClickDelete = async (event) => {
        setLoading(true)
        await axios.delete(PPD_Order, { data: { id: FindId } });
        setLoading(false)

        setFindId("");
        setShowRead(false);
        toast.success(`Cancel success!`);
    }

    return (
        <div className='container'>
            <Header />
            <main>
                <div className='container-myAccount'>
                    <div className='my-order'>
                        <h2>My Order</h2>
                        <table className='table-order' >
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TOTAL</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Order.map((e, i) => (
                                        <tr key={e.id}>
                                            <td>{i + 1}</td>
                                            <td>$ {e.Total}</td>
                                            <td>{e.Status}</td>
                                            <td>
                                                <button onClick={() => HandleClickDetail(e)}>Detail</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* read */}
                    <div className='modal-read-product' hidden={showRead ? false : true}>
                        <div className='create-product'>
                            <div className='title-create-product'>
                                <h2>Detail a Order</h2>
                                <i onClick={() => setShowRead(false)} ><AiOutlineClose /></i>
                            </div>
                            <div className='table-product'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Size</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListCarts.map((e) => {
                                                let FindCart = [];
                                                if (e.id) {
                                                    FindCart = ListProducts.find((event) => event.id === e.ProductID)
                                                }
                                                return (
                                                    <tr key={e.id}>
                                                        <td>{FindCart.Name}</td>
                                                        <td>${FindCart.Price}</td>
                                                        <td>{e.Size}</td>
                                                        <td>{e.Quantity}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <h3>Price: $ {FindOrder.Total}</h3>

                            <div className='btn-detail-product'>
                                <button onClick={() => HandleClickDelete(FindOrder.id)} >Cancel Order</button>
                            </div>
                        </div>
                    </div>


                    <h2>My Account</h2>
                    <div className='my-account-setting'>
                        <label>Name:</label> <br />
                        <input value={Name} onChange={() => { }} /> <br />
                        <label>Phone:</label> <br />
                        <input value={Phone} disabled onChange={() => { }} /> <br />
                        <button>Change password</button> <br />
                        <label>My Password:</label> <br />
                        <input placeholder='My password ...' /> <br />
                        <label>New Password:</label> <br />
                        <input placeholder='New password ...' /> <br />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}