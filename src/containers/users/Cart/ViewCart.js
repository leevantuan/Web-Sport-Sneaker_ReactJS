import React, { useEffect, useRef, useState } from 'react'
import './ViewCart.scss';
import axios from 'axios';

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';

import { GetProduct, GetCart, Check_Login_Users, PPD_Cart, Put_Status_Cart, PPD_Order, Delete_Cart_User } from "../../../routers/API";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function ViewCart() {
    let navigate = useNavigate();
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")

    const [loading, setLoading] = useState(false)
    const [CheckOut, setCheckOut] = useState(false)
    const [ListProducts, setListProducts] = useState([]);
    const [ListCarts, setListCarts] = useState([]);
    const [ProductsCart, setProductsCart] = useState([]);
    const [TotalCart, setTotalCart] = useState(0);
    //API
    useEffect(() => {
        const fetchProduct = async () => {
            await axios.get(GetProduct)
                .then((res) => setListProducts(res.data.data))
                .catch((error) => console.log(error))
        }
        fetchProduct();
    }, [])
    //API
    useEffect(() => {
        setLoading(true);
        const fetchCart = async () => {
            await axios.get(GetCart)
                .then((res) => setListCarts(res.data.data))
                .catch((error) => console.log(error))
        }
        fetchCart();
        setLoading(false);
    }, [loading])
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
    //filter cart with user phone number
    useEffect(() => {
        const List = ListCarts.filter((cart) => cart.Phone === Phone && cart.Status === 1)

        const ListProductID = List.map((id) => id.ProductID)

        setProductsCart(ListProductID.map((event) => ListProducts.find((item) => item.id === event)));

    }, [ListCarts, ListProducts, Phone])

    const List = ListCarts.filter((cart) => cart.Phone === Phone && cart.Status === 1)
    //Total cart
    useEffect(() => {
        const ListPriceCart = ProductsCart.map((event) => event.Price)
        const ListQuantityCart = List.map((event) => event.Quantity)

        let TotalCart = 0;
        for (var i = 0; i < ListPriceCart.length; i++) {
            let Price = ListPriceCart[i];
            let Quantity = ListQuantityCart[i];
            TotalCart = TotalCart + (Price * Quantity);
        }
        setTotalCart(TotalCart);
    }, [ProductsCart, List, loading])
    //API
    const HandleDeleteACart = async (event) => {
        let ProductRemove = List.find((e) => e.ProductID === event)
        setLoading(true)
        await axios.delete(Delete_Cart_User, { data: { id: ProductRemove.id, Status: 1 } });
        setLoading(false)
        window.location.reload(false);
    }
    //API
    const HandleIncrease = async (event) => {
        let Quantity = event.Quantity + 1;
        setLoading(true)
        await axios.put(PPD_Cart, { Quantity: Quantity, id: event.id });
        setLoading(false)
    }
    //API
    const HandleReduce = async (event) => {
        let Quantity = event.Quantity - 1;
        if (Quantity === 0) {
            setLoading(true)
            await axios.put(PPD_Cart, { Quantity: Quantity, id: event.id });
            setLoading(false)
            window.location.reload(false);
        }
        setLoading(true)
        await axios.put(PPD_Cart, { Quantity: Quantity, id: event.id });
        setLoading(false)
    }
    let Totals = ((TotalCart * 5 / 100) + TotalCart).toFixed();
    let ListCartStatus = ListCarts.filter((e) => e.Status === 1)
    let ListCart = ListCartStatus.map((e) => e.id)
    //
    const ref = useRef(null)
    //API
    const HandleOrder = async () => {
        if (Address) {
            setLoading(true)
            await axios.post(PPD_Order, { Status: "Confirming", Address: Address, Phone: Phone, Total: Totals, ListCart: ListCart });
            await axios.put(Put_Status_Cart, { Phone: Phone });
            setLoading(false)
            alert("Success")
            navigate("/Home", { replace: true });
        }
        else {
            toast.error("Enter address. Please!")
            ref.current.focus();
        }
    }

    return (
        <div className='container'>
            <Header />
            <main>
                <div className='container-ViewCart'>
                    <h1>The cart of user with phone number is: {Name}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ProductsCart.map((e) => {
                                    if (e.id) {
                                        const FindCart = List.find((event) => event.ProductID === e.id)
                                        if (FindCart) {
                                            return (
                                                <tr key={e.id}>
                                                    <td>
                                                        <img src={e.Image} alt='' />
                                                    </td>
                                                    <td>{e.Name}</td>
                                                    <td>$ {e.Price}</td>
                                                    <td>
                                                        {FindCart.Size}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => HandleReduce(FindCart)}>-</button>
                                                        {FindCart.Quantity}
                                                        <button onClick={() => HandleIncrease(FindCart)}>+</button>
                                                    </td>
                                                    <td><button onClick={() => HandleDeleteACart(e.id)}>X</button></td>
                                                </tr>
                                            )
                                        }
                                    }
                                    return (
                                        <div key={e.id}></div>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                    <h2>Total price of the cart is: $ {TotalCart}</h2>
                    <button onClick={() => setCheckOut(!CheckOut)}>CHECK OUT</button>
                    <div className='check-out' hidden={CheckOut ? false : true} >
                        <h2>Order: </h2>
                        <p>Total products: ${TotalCart}</p>
                        <p>Ship ( 5% of total products ): ${TotalCart * 5 / 100}</p>
                        <p>Total money to pay: ${Totals}</p>
                        <label>Address: </label>
                        <input placeholder='Address ...' onChange={(e) => setAddress(e.target.value)} ref={ref} />
                        <button onClick={() => HandleOrder()}>ORDER</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
