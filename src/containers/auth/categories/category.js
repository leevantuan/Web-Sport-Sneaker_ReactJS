import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './category.scss'

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';
import isLoginAuth from '../isLoginAuth';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
//API
import { GetCategory, PPD_Category } from "../../../routers/API";

export default function Category() {

    const check = isLoginAuth();

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [CategoryText, setCategoryText] = useState("")
    const [MadeInText, setMadeInText] = useState("")
    const [FindId, setFindId] = useState("")
    const [SearchText, setSearchText] = useState("")

    //API Category
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetCategory);
            setCategory(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    let SearchCategory = category.filter((e) => e.CategoryName.includes(SearchText));

    //Paginate
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(5);
    let totalPage = Math.ceil(SearchCategory.length / currentLastPage)
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentCategory = SearchCategory.slice(indexOfFistPost, indexOfLastPost);
    const handlePageClick = (event) => {
        setNumberPage(event.selected + 1);
    }

    //API Create Category
    const HandleCreate = async () => {
        setLoading(true)
        await axios.post(PPD_Category, { CategoryName: CategoryText, MadeIn: MadeInText });
        setLoading(false)

        setShowCreate(false);
        setCategoryText("");
        setMadeInText("");
        toast.success("Create a category success!")
    }
    let FindCategory = []
    if (FindId !== "") {
        FindCategory = category.find((e) => e.id === FindId)
    }
    const HandleClickEdit = (event) => {
        setFindId(event.id);
        setShowUpdate(true);

        if (FindCategory !== []) {
            setCategoryText(event.CategoryName);
            setMadeInText(event.MadeIn);
        }
    }
    const HandleClickDelete = (event) => {
        setFindId(event.id);
        setShowDelete(true);
    }
    const HandleUpdate = async (FindCategory) => {
        setLoading(true)
        await axios.put(PPD_Category, { CategoryName: CategoryText, MadeIn: MadeInText, id: FindId });
        setLoading(false)

        setShowUpdate(false);
        setCategoryText("");
        setMadeInText("");
        toast.success(`Update with ID ${FindCategory.id} success!`);

    }
    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete(PPD_Category, { data: { id: FindId } });
        setLoading(false)

        setFindId("");
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
                            <h2>Category List</h2>
                            <button onClick={() => setShowCreate(true)}>Add new</button>
                        </div>
                        <div className='search-auth'>
                            <input placeholder='Search with category name ....?' onChange={(e) => setSearchText(e.target.value)} />
                            <i><AiOutlineSearch /></i>
                        </div>
                        <table className='table-category' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CATEGORY NAME</th>
                                    <th>MADE IN</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    CurrentCategory.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.CategoryName}</td>
                                            <td>{e.MadeIn}</td>
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

                    {/* Create a category */}
                    <div className='modal-create-category' hidden={showCreate ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Create a Category</h2>
                                <i onClick={() => setShowCreate(false)} ><AiOutlineClose /></i>
                            </div>
                            <form>
                                <div className='input-category'>
                                    <label>Category name: </label>
                                    <input type='text' placeholder='Category name ...' onChange={(e) => setCategoryText(e.target.value)} required />
                                </div>
                                <div className='input-category'>
                                    <label>Made in category: </label>
                                    <input type='text' placeholder='Made in category ...' onChange={(e) => setMadeInText(e.target.value)} required />
                                </div>
                                <button className='btn-category' onClick={() => HandleCreate()}>Create</button>
                            </form>
                        </div>
                    </div>

                    {/* update a category */}
                    <div className='modal-create-category' hidden={showUpdate ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Create a Category</h2>
                                <i onClick={() => setShowUpdate(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <div className='input-category'>
                                    <label>Category name: </label>
                                    <input type='text' value={CategoryText} onChange={(e) => setCategoryText(e.target.value)} />
                                </div>
                                <div className='input-category'>
                                    <label>Made in category: </label>
                                    <input type='text' value={MadeInText} onChange={(e) => setMadeInText(e.target.value)} />
                                </div>
                                <h2 hidden>{FindCategory.id}</h2>
                                <button className='btn-category' onClick={() => HandleUpdate(FindCategory)}>Update</button>
                            </div>
                        </div>
                    </div>

                    {/* delete a category */}
                    <div className='modal-create-category' hidden={showDelete ? false : true}>
                        <div className='create-category'>
                            <div className='title-create-category'>
                                <h2>Delete a Category</h2>
                                <i onClick={() => setShowDelete(false)} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <h2>Are you sure delete category with ID: {FindCategory.id}?</h2>
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
