import React, { useEffect, useState } from 'react'
import './ViewCart.scss'

import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';

import axios from 'axios';

export default function ViewCart() {
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")

    //list
    const [loading, setLoading] = useState(false)
    const [CheckOut, setCheckOut] = useState(false)
    const [ListProducts, setListProducts] = useState([]);
    const [ListCarts, setListCarts] = useState([]);

    //cart
    const [ProductsCart, setProductsCart] = useState([]);
    const [TotalCart, setTotalCart] = useState(0);

    //list product
    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            await axios.get('http://localhost:8080/API/products').then((res) => setListProducts(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchProduct();
    }, [loading])

    //list cart
    useEffect(() => {
        setLoading(true);
        const fetchCart = async () => {
            await axios.get('http://localhost:8080/API/carts').then((res) => setListCarts(res.data.data)).catch((error) => console.log(error))
        }
        setLoading(false)
        fetchCart();
    }, [loading])

    //user check
    useEffect(() => {
        const fetchUser = async () => {
            await axios.post("http://localhost:8080/check-user", {},
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

    let List = ListCarts.filter((cart) => cart.Phone === Phone)

    useEffect(() => {
        //Total cart
        const ListPriceCart = ProductsCart.map((event) => event.Price)
        const ListQuantityCart = List.map((event) => event.Quantity)

        let TotalCart = 0;
        for (var i = 0; i < ListPriceCart.length; i++) {
            let Price = ListPriceCart[i];
            let Quantity = ListQuantityCart[i];
            TotalCart = TotalCart + (Price * Quantity);
        }
        setTotalCart(TotalCart)
    }, [ProductsCart, List])

    const HandleDeleteACart = async (event) => {

        let ProductRemove = List.find((e) => e.ProductID === event)

        setLoading(true)
        await axios.delete('http://localhost:8080/API/create-a-cart', { data: { id: ProductRemove.id } });
        setLoading(false)

        window.location.reload(false);
    }

    const HandleIncrease = async (event) => {
        let Quantity = event.Quantity + 1;

        setLoading(true)
        await axios.put('http://localhost:8080/API/create-a-cart', { Quantity: Quantity, id: event.id });
        setLoading(false)

    }
    const HandleReduce = async (event) => {
        let Quantity = event.Quantity - 1;

        setLoading(true)
        await axios.put('http://localhost:8080/API/create-a-cart', { Quantity: Quantity, id: event.id });
        setLoading(false)

        window.location.reload(false);
    }

    let Totals = ((TotalCart * 5 / 100) + TotalCart).toFixed();

    let ListCartStatus = ListCarts.filter((e) => e.Status === 1)

    let ListCart = ListCartStatus.map((e) => e.id)

    const HandleOrder = async () => {
        // let ListCart = ListCarts.map((e) => e.id)
        setLoading(true)
        await axios.post('http://localhost:8080/API/create-a-order', { Status: "Confirming", Address: Address, Phone: Phone, Total: Totals, ListCart: ListCart });
        await axios.put('http://localhost:8080/API/update-status', { Phone: Phone });
        window.location.reload(false);
        setLoading(false)

        alert("Ok")
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
                                    let FindCart = [];
                                    if (e.id) {
                                        FindCart = List.find((event) => event.ProductID === e.id)
                                    }
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
                        <input placeholder='Address ...' onChange={(e) => setAddress(e.target.value)} />
                        <button onClick={() => HandleOrder()}>ORDER</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
