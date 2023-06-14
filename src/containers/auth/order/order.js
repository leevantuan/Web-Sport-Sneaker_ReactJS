import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './order.scss'

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';
import isLoginAuth from '../isLoginAuth';

import { GetOrder, GetCart, GetProduct, PPD_Order } from "../../../routers/API";
export default function Order() {
    const check = isLoginAuth();

    const ListStatus = [
        { id: 1, status: "Cancel" },
        { id: 2, status: "Confirm" },
        { id: 3, status: "Delivering" },
        { id: 4, status: "Success" },
        { id: 5, status: "Confirming" },
    ]
    const [loading, setLoading] = useState(false);
    const [Order, setOrder] = useState([]);
    const [Cart, setCart] = useState([]);
    const [Product, setProduct] = useState([]);

    const [showUpdate, setShowUpdate] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [FindId, setFindId] = useState("")
    const [Status, setStatus] = useState("")
    const [SearchText, setSearchText] = useState("")
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

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetCart);
            setCart(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetProduct);
            setProduct(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    //Pagination
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(10);
    let totalPage = Math.ceil(Order.length / currentLastPage)
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentProduct = Order.slice(indexOfFistPost, indexOfLastPost);

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
    const HandleClickEdit = (event) => {
        setShowUpdate(true);
        setFindId(event);
        setShowRead(false);
        if (FindOrder !== []) {
            setStatus(FindOrder.Status)
        }
    }
    const HandleClickDelete = (event) => {
        setShowDelete(true);
        setFindId(event);
        setShowRead(false);
    }
    //API
    const HandleUpdate = async () => {
        setLoading(true);
        await axios.put(PPD_Order,
            { Status: Status, id: FindId })
        setLoading(true);
        setStatus("");
        setShowUpdate(false)
        toast.success("Update status success!")
    }
    //API
    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete(PPD_Order, { data: { id: FindId } });
        setLoading(false)
        setFindId("");
        setShowDelete(false);
        toast.success(`Delete a category success!`);
    }
    const HandleDeleteOrder = async (id) => {
        setLoading(true)
        await axios.delete(PPD_Order, { data: { id: id } });
        setLoading(false)
        toast.success(`Delete a category success!`);
    }
    const handlePageClick = (event) => {
        setNumberPage(event.selected + 1);
    }

    if (check) {
        return (
            <div className='container'>
                <AuthNavbar />
                <main>
                    <div className='product-container'>
                        <div className='title-table'>
                            <h2>Order List</h2>
                        </div>
                        <div className='search-auth'>
                            <input placeholder='Search with phone number ....?' onChange={(e) => setSearchText(e.target.value)} />
                            <i><AiOutlineSearch /></i>
                        </div>
                        <table className='table-product' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PHONE NAME</th>
                                    <th>ADDRESS</th>
                                    <th>TOTAL</th>
                                    <th>CART ID</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    CurrentProduct.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.Phone}</td>
                                            <td>{e.Address}</td>
                                            <td>$ {e.Total}</td>
                                            <td>{e.ListCart}</td>
                                            <td>{e.Status}</td>
                                            <td>
                                                <button onClick={() => HandleClickDetail(e)}>Detail</button>
                                                <button onClick={() => HandleDeleteOrder(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>

                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={totalPage}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}

                            marginPagesDisplayed={2}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active-paginate"
                        />
                    </div>

                    {/* Update a product */}
                    <div className='modal-create-product' hidden={showUpdate ? false : true}>
                        <div className='create-product'>
                            <div className='title-create-product'>
                                <h2>Update a Status</h2>
                                <i onClick={() => {
                                    setShowUpdate(false);
                                    setShowRead(true);
                                }} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <div className='container-input'>
                                    <div className='input-product'>
                                        <label>Status: </label>
                                        <select value={Status} onChange={(e) => setStatus(e.target.value)} >
                                            {
                                                ListStatus.map((e) => (
                                                    <option key={e.id} value={e.status}>{e.status}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <button className='btn-back' onClick={() => {
                                    setShowUpdate(false);
                                    setShowRead(true);
                                }}>Back</button>
                                <button className='btn-product' onClick={() => HandleUpdate()}>Update</button>
                            </div>
                        </div>
                    </div>

                    {/* Read a product */}
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
                            <h2>Name</h2>
                            <p>Phone number: {FindOrder.Phone}</p>
                            <p>Address: {FindOrder.Address}</p>
                            <p>Status: {FindOrder.Status}</p>
                            <h3>Price: $ {FindOrder.Total}</h3>

                            <div className='btn-detail-product'>
                                <button onClick={() => HandleClickEdit(FindOrder.id)}>Edit</button>
                                <button onClick={() => HandleClickDelete(FindOrder.id)}>Delete</button>
                            </div>
                        </div>
                    </div>

                    {/* Delete a product */}
                    <div className='modal-create-product' hidden={showDelete ? false : true}>
                        <div className='create-product'>
                            <div className='title-create-product'>
                                <h2>Delete a product</h2>
                                <i onClick={() => {
                                    setShowDelete(false);
                                    setShowRead(true);
                                }} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <h2>Are you sure delete?</h2>
                                <button className='btn-back' onClick={() => {
                                    setShowDelete(false);
                                    setShowRead(true);
                                }}>Back</button>
                                <button className='btn-product' onClick={() => HandleDelete()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
    else {
        return (
            <h1 style={{ width: "100vw", height: "100vh", display: "Flex", justifyContent: "center", alignItems: "center", fontSize: 50, margin: 0 }}><Link to="/Auth" >Login, Please!</Link></h1>
        )
    }

}
