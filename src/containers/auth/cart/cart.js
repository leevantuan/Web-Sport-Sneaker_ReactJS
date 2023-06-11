import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../../../routers/axiosCustom'
import './cart.scss'
import ReactPaginate from 'react-paginate'

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';

import isLoginAuth from '../isLoginAuth';
import { Link } from 'react-router-dom';

export default function Cart() {

    const check = isLoginAuth();

    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);

    const [showDelete, setShowDelete] = useState(false)

    const [FindId, setFindId] = useState("")
    const [SearchText, setSearchText] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/carts');
            setCart(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    let SearchCart = [];
    if (SearchText === "") {
        SearchCart = cart;
    }
    else {
        SearchCart = cart.filter((e) => e.UserID == SearchText);
    }

    //Pagination
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(12);

    let totalPage = Math.ceil(SearchCart.length / currentLastPage)

    //Get current
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentCart = SearchCart.slice(indexOfFistPost, indexOfLastPost);

    const handlePageClick = (event) => {
        setNumberPage(event.selected + 1);
    }

    let FindCart = []
    if (FindId !== "") {
        FindCart = cart.find((e) => e.id === FindId)
    }


    const HandleClickDelete = (event) => {
        setFindId(event.id);
        setShowDelete(true);
    }

    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete('/create-a-cart', { data: { id: FindId } });
        setFindId("");
        setLoading(false)

        setShowDelete(false);
        toast.success(`Delete a category success!`);
    }
    if (check) {
        return (
            <div className='container'>
                <AuthNavbar />
                <main>
                    <div className='category-container'>
                        <div className='title-table'>
                            <h2>Cart List</h2>
                        </div>
                        <div className='search-auth'>
                            <input placeholder='Search with user ID ....?' onChange={(e) => setSearchText(e.target.value)} />
                            <i><AiOutlineSearch /></i>
                        </div>
                        <table className='table-category' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER PHONE NUMBER</th>
                                    <th>PRODUCT ID</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    CurrentCart.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.Phone}</td>
                                            <td>{e.ProductID}</td>
                                            <td>
                                                <button onClick={() => HandleClickDelete(e)}>Delete</button>
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

                    {/* delete a cart */}
                    <div className='modal-create-category' hidden={showDelete ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Delete</h2>
                                <i onClick={() => setShowDelete(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <h2>Are you sure delete product in the cart with User Phone number: {FindCart.Phone}?</h2>
                                <button className='btn-category' onClick={() => HandleDelete()}>Delete</button>
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
