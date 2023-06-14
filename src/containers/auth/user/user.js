import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.scss';
import ReactPaginate from 'react-paginate';

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';
import isLoginAuth from '../isLoginAuth';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


import { GetUsers, PPD_Users } from "../../../routers/API";
export default function User() {

    const check = isLoginAuth();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    const RolesID = [
        { id: 0, role: "user" },
        { id: 1, role: "admin" },
    ]

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [NameText, setNameText] = useState("")
    const [PhoneText, setPhoneText] = useState("")
    const [PasswordText, setPasswordText] = useState("")
    const [RoleIDText, setRoleIDText] = useState("")
    const [message, setMessage] = useState("")
    const [FindId, setFindId] = useState("")
    const [searchText, setSearchText] = useState("");
    //API
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetUsers);
            setUser(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    let FilterUsers = [...user].sort((a, b) =>
        a.RoleID > b.RoleID ? 1 : -1,
    );

    let SearchUsers = FilterUsers.filter((user) => user.Phone.includes(searchText));

    //Pagination
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(5);
    let totalPage = Math.ceil(SearchUsers.length / currentLastPage)
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentUser = SearchUsers.slice(indexOfFistPost, indexOfLastPost);

    const handlePageClick = (event) => {
        setNumberPage(event.selected + 1);
    }
    //API
    const HandleCreate = async () => {
        setLoading(true)
        let { data } = await axios.post(PPD_Users, { Name: NameText, Phone: PhoneText, PassWord: PasswordText, RoleID: RoleIDText });
        setLoading(false)
        if (data.message === "success") {
            setShowCreate(false);
            setNameText("");
            setPhoneText("");
            setPasswordText("");
            setRoleIDText("");
            toast.success("Create a user success!")
        }
        else {
            setMessage(data.message);
        }
    }
    let FindUser = []
    if (FindId !== "") {
        FindUser = user.find((e) => e.id === FindId)
    }
    const HandleClickEdit = (event) => {
        setFindId(event.id);
        setShowUpdate(true);
        if (FindUser !== []) {
            setNameText(event.Name);
            setPhoneText(event.Phone);
            setRoleIDText(event.RoleID);
        }
    }
    const HandleClickDelete = (event) => {
        setFindId(event.id);
        setShowDelete(true);
    }
    //API
    const HandleUpdate = async (FindCategory) => {
        setLoading(true)
        await axios.put(PPD_Users, { Name: NameText, Phone: PhoneText, PassWord: PasswordText, RoleID: RoleIDText, id: FindId });
        setLoading(false)

        setNameText("");
        setPhoneText("");
        setRoleIDText("");
        setPasswordText("");
        setShowUpdate(false)
        toast.success(`Update with ID ${FindUser.id} success!`);
    }
    //API
    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete(PPD_Users, { data: { id: FindId } });
        setLoading(false)

        setFindId("");
        setShowDelete(false);
        toast.success(`Delete a user success!`);
    }
    if (check) {
        return (
            <div className='container'>
                <AuthNavbar />
                <main>
                    <div className='category-container'>
                        <div className='title-table'>
                            <h2>Users List</h2>
                            <button onClick={() => setShowCreate(true)}>Add new</button>
                        </div>
                        <div className='search-auth'>
                            <input placeholder='Search with phone number ....?' onChange={(e) => setSearchText(e.target.value)} />
                            <i><AiOutlineSearch /></i>
                        </div>
                        <table className='table-category' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                    <th>ROLE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    CurrentUser.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.Name}</td>
                                            <td>{e.Phone}</td>
                                            <td>{e.RoleID}</td>
                                            <td>
                                                <button onClick={() => HandleClickEdit(e)}>Edit</button>
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

                    {/* Create a user */}
                    <div className='modal-create-category' hidden={showCreate ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Create a User</h2>
                                <i onClick={() => setShowCreate(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <div className='input-category'>
                                    <label>Name: </label>
                                    <input type='text' placeholder='Your name ...' onChange={(e) => setNameText(e.target.value)} required />
                                    <p style={{ color: "red" }}>Maximum name is 20 length.</p>
                                </div>
                                <div className='input-category'>
                                    <label>Phone Number: </label>
                                    <input type='text' placeholder='Phone number ...' onChange={(e) => setPhoneText(e.target.value)} required />
                                </div>
                                <div className='input-category'>
                                    <label>Password: </label>
                                    <input type='text' placeholder='Password ...' onChange={(e) => setPasswordText(e.target.value)} required />
                                    <p style={{ color: "red" }}>Minimum Password is 8 length.</p>
                                </div>
                                <div className='input-category'>
                                    <label>RoleID: </label>
                                    <select onChange={(e) => setRoleIDText(e.target.value)}>
                                        {
                                            RolesID.map((e) => (
                                                <option key={e.id} value={e.role} >{e.role}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <p>{message}</p>
                                <button className='btn-category' onClick={() => HandleCreate()}>Create</button>
                            </div>
                        </div>
                    </div>

                    {/* update a category */}
                    <div className='modal-create-category' hidden={showUpdate ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Update a user</h2>
                                <i onClick={() => setShowUpdate(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <div className='input-category'>
                                    <label>Name: </label>
                                    <input type='text' value={NameText} onChange={(e) => setNameText(e.target.value)} required />
                                    <p style={{ color: "red" }}>Maximum name is 20 length.</p>
                                </div>
                                <div className='input-category'>
                                    <label>Phone Number: </label>
                                    <input type='text' value={PhoneText} onChange={(e) => setPhoneText(e.target.value)} required />
                                </div>
                                <div className='input-category'>
                                    <label>Password: </label>
                                    <input type='text' value={PasswordText} placeholder='New password ...' onChange={(e) => setPasswordText(e.target.value)} required />
                                    <p style={{ color: "red" }}>Minimum Password is 8 length.</p>
                                </div>
                                <div className='input-category'>
                                    <label>RoleID: </label>
                                    <select onChange={(e) => setRoleIDText(e.target.value)}>
                                        {
                                            RolesID.map((e) => (
                                                <option key={e.id} value={e.role} >{e.role}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <p>{message}</p>
                                <h2 hidden>{FindUser.id}</h2>
                                <button className='btn-category' onClick={() => HandleUpdate()}>Update</button>
                            </div>
                        </div>
                    </div>

                    {/* delete a category */}
                    <div className='modal-create-category' hidden={showDelete ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Delete a User</h2>
                                <i onClick={() => setShowDelete(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <h2>Are you sure delete user with phone: {FindUser.Phone}?</h2>
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
