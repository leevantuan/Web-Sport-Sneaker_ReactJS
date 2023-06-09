import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './products.scss';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';
import isLoginAuth from '../isLoginAuth';

import { GetProduct, PPD_Product, GetCategory, GetImage } from "../../../routers/API";

export default function Product() {

    const check = isLoginAuth();

    const bool = [
        { id: 0, bool: "False" },
        { id: 1, bool: "True" }
    ]

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [listImage, setListImage] = useState([]);

    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [NameText, setNameText] = useState("")
    const [DetailText, setDetailText] = useState("")
    const [PriceText, setPriceText] = useState("")
    const [ImageText, setImageText] = useState("")
    const [SaleText, setSaleText] = useState(0)
    const [NewText, setNewText] = useState(0)
    const [CategoryText, setCategoryText] = useState("")
    const Quantity = 1;

    const [FindId, setFindId] = useState("")
    const [SearchText, setSearchText] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(GetProduct);
            setProduct(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    let SearchProduct = product.filter((e) => e.Name.includes(SearchText));
    //sort
    let Products = [...SearchProduct].sort((a, b) => b.id - a.id);
    //Pagination
    const [NumberPage, setNumberPage] = useState(1);
    const [currentLastPage] = useState(10);

    let totalPage = Math.ceil(Products.length / currentLastPage)

    //Get current
    const indexOfLastPost = NumberPage * currentLastPage;
    const indexOfFistPost = indexOfLastPost - currentLastPage;
    const CurrentProduct = Products.slice(indexOfFistPost, indexOfLastPost);
    //API
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get(GetCategory);
            setCategory(res.data.data);
            setCategoryText(res.data.data[0].id)
        }
        fetchCategory();
    }, [loading])
    //API
    useEffect(() => {
        const fetchImage = async () => {
            const res = await axios.get(GetImage);
            setListImage(res.data.data);
        }
        fetchImage();
    }, [loading])


    let FindProduct = []
    if (FindId !== "") {
        FindProduct = product.find((e) => e.id === FindId)
    }
    let FindCategory = []
    if (FindId !== "") {
        FindCategory = category.find((e) => e.id === FindProduct.CategoryId)
    }
    let FindImage = []
    if (FindId !== "") {
        FindImage = listImage.filter((e) => e.ProductId === FindProduct.id)
    }

    const HandleClickDetail = (event) => {
        setShowRead(true);
        setFindId(event.id);


    }

    const HandleClickEdit = (event) => {
        setShowUpdate(true);
        setFindId(event.id);
        setShowRead(false);

        if (FindProduct !== []) {
            setNameText(event.Name);
            setDetailText(event.Detail);
            setPriceText(event.Price);
            setImageText(event.Image);
        }
    }

    const HandleClickDelete = (event) => {
        setShowDelete(true);
        setFindId(event.id);
        setShowRead(false);
    }
    //API
    const HandleCreate = async () => {
        setLoading(true);
        await axios.post(PPD_Product,
            { Name: NameText, Price: PriceText, Detail: DetailText, Image: ImageText, Sale: SaleText, New: NewText, CategoryId: CategoryText, Quantity: Quantity })
        setLoading(true);

        setNameText("");
        setDetailText("");
        setPriceText("");
        setImageText("");

        setShowCreate(false);
        toast.success("Create a product success!")
    }
    //API
    const HandleUpdate = async () => {
        setLoading(true);
        await axios.put(PPD_Product,
            { Name: NameText, Price: PriceText, Detail: DetailText, Image: ImageText, Sale: SaleText, New: NewText, CategoryId: CategoryText, Quantity: Quantity, id: FindId })
        setLoading(true);

        setShowUpdate(false);
        setNewText(0);
        setSaleText(0);
        toast.success("Update a product success!")
    }
    //API
    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete(PPD_Product, { data: { id: FindId } });
        setLoading(false)

        setFindId("");
        setShowDelete(false);
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
                            <h2>Product List</h2>
                            <button onClick={() => setShowCreate(true)}>Add new</button>
                        </div>
                        <div className='search-auth'>
                            <input placeholder='Search with product name ....?' onChange={(e) => setSearchText(e.target.value)} />
                            <i><AiOutlineSearch /></i>
                        </div>
                        <table className='table-product' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>DETAIL</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    CurrentProduct.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.Name}</td>
                                            <td>{e.Detail}</td>
                                            <td>
                                                <button onClick={() => HandleClickDetail(e)}>Detail</button>
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

                    {/* Create a product */}
                    <div className='modal-create-product' hidden={showCreate ? false : true}>
                        <div className='create-product'>
                            <div className='title-create-product'>
                                <h2>Create a product</h2>
                                <i onClick={() => setShowCreate(false)} ><AiOutlineClose /></i>
                            </div>
                            <form>
                                <div className='input-product'>
                                    <label>Product name: </label>
                                    <input type='text' placeholder='Product name ...' onChange={(e) => { setNameText(e.target.value) }} required />
                                </div>
                                <div className='input-product'>
                                    <label>Detail: </label>
                                    <input type='text' placeholder='Detail ...' onChange={(e) => { setDetailText(e.target.value) }} required />
                                </div>
                                <div className='input-product'>
                                    <label>Image Link: </label>
                                    <input type='text' placeholder='http:// ...' onChange={(e) => { setImageText(e.target.value) }} required />
                                </div>
                                <div className='container-input'>
                                    <div className='input-product'>
                                        <label>Price: </label>
                                        <input type='text' placeholder='Price ...' onChange={(e) => { setPriceText(e.target.value) }} required />
                                    </div>

                                    <div className='input-product'>
                                        <label>Category: </label>
                                        <select onChange={(e) => setCategoryText(e.target.value)} >
                                            {
                                                category.map((e) => (

                                                    <option key={e.id} value={e.id}>{e.CategoryName}</option>

                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className='container-input'>
                                    <div className='input-product'>
                                        <label>Sale: </label>
                                        <select onChange={(e) => setSaleText(e.target.value)} >
                                            {
                                                bool.map((e) => (
                                                    <option key={e.id} value={e.id} >{e.bool}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='input-product'>
                                        <label>New: </label>
                                        <select onChange={(e) => setNewText(e.target.value)} >
                                            {
                                                bool.map((e) => (
                                                    <option key={e.id} value={e.id} >{e.bool}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <button className='btn-product' onClick={() => HandleCreate()}>Create</button>
                            </form>
                        </div>
                    </div>

                    {/* Update a product */}
                    <div className='modal-create-product' hidden={showUpdate ? false : true}>
                        <div className='create-product'>
                            <div className='title-create-product'>
                                <h2>Update a product</h2>
                                <i onClick={() => {
                                    setShowUpdate(false);
                                    setShowRead(true);
                                }} ><AiOutlineClose /></i>
                            </div>
                            <div>
                                <div className='input-product'>
                                    <label>Product name: </label>
                                    <input type='text' value={NameText} placeholder='Product name ...' onChange={(e) => { setNameText(e.target.value) }} />
                                </div>
                                <div className='input-product'>
                                    <label>Detail: </label>
                                    <input type='text' value={DetailText} placeholder='Detail ...' onChange={(e) => { setDetailText(e.target.value) }} />
                                </div>
                                <div className='input-product'>
                                    <label>Image Link: </label>
                                    <input type='text' value={ImageText} placeholder='http:// ...' onChange={(e) => { setImageText(e.target.value) }} />
                                </div>
                                <div className='container-input'>
                                    <div className='input-product'>
                                        <label>Price: </label>
                                        <input type='text' value={PriceText} placeholder='Price ...' onChange={(e) => { setPriceText(e.target.value) }} />
                                    </div>

                                    <div className='input-product'>
                                        <label>Category: </label>
                                        <select onChange={(e) => setCategoryText(e.target.value)} >
                                            {
                                                category.map((e) => (

                                                    <option key={e.id} value={e.id}>{e.CategoryName}</option>

                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className='container-input'>
                                    <div className='input-product'>
                                        <label>Sale: </label>
                                        <select onChange={(e) => setSaleText(e.target.value)} >
                                            {
                                                bool.map((e) => (
                                                    <option key={e.id} value={e.id} >{e.bool}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='input-product'>
                                        <label>New: </label>
                                        <select onChange={(e) => setNewText(e.target.value)} >
                                            {
                                                bool.map((e) => (
                                                    <option key={e.id} value={e.id} >{e.bool}</option>
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
                                <h2>Detail a Product</h2>
                                <i onClick={() => setShowRead(false)} ><AiOutlineClose /></i>
                            </div>
                            <div className='img-product'>
                                <img src={FindProduct.Image} alt='' />
                                <div className='list-img'>
                                    {
                                        FindImage.map((e) => (
                                            <img key={e.id} src={e.ImageLink} alt='' />
                                        ))
                                    }
                                </div>
                            </div>
                            <h2>{FindProduct.Name}</h2>
                            <p>{FindProduct.Detail}</p>
                            <p>Category: {FindCategory.CategoryName}</p>
                            <p> Made In: {FindCategory.MadeIn}</p>
                            <h3>Price: $ {FindProduct.Price}</h3>
                            <span className='sale-new'>
                                <p>
                                    SALE: {FindProduct.Sale && FindProduct.Sale === 1 ? "True" : "False"}
                                </p>
                                <p>
                                    NEW: {FindProduct.New && FindProduct.New === 1 ? "True" : "False"}
                                </p>
                            </span>
                            <div className='btn-detail-product'>
                                <button onClick={() => HandleClickEdit(FindProduct)}>Edit</button>
                                <button onClick={() => HandleClickDelete(FindProduct)}>Delete</button>
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
                                <h2>Are you sure delete product with ID: {FindProduct.id}?</h2>
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
