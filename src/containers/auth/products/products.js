import React, { useEffect, useState } from 'react'
import axios from '../../../routers/axiosCustom'
import './products.scss'

import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';

import isLoginAuth from '../isLoginAuth';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/products');
            setProduct(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get('/categories');
            setCategory(res.data.data);
            setCategoryText(res.data.data[0].id)
        }
        fetchCategory();
    }, [loading])

    useEffect(() => {
        const fetchImage = async () => {
            const res = await axios.get('/images');
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

    const HandleCreate = async () => {
        setLoading(true);
        await axios.post("/create-a-product",
            { Name: NameText, Price: PriceText, Detail: DetailText, Image: ImageText, Sale: SaleText, New: NewText, CategoryId: CategoryText, Quantity: Quantity })
        setLoading(true);

        setNameText("");
        setDetailText("");
        setPriceText("");
        setImageText("");

        setShowCreate(false);
        toast.success("Create a product success!")
    }

    const HandleUpdate = async () => {
        // console.log(NameText, PriceText, DetailText, ImageText, SaleText, NewText, CategoryText, Quantity, FindId)
        setLoading(true);
        await axios.put("/create-a-product",
            { Name: NameText, Price: PriceText, Detail: DetailText, Image: ImageText, Sale: SaleText, New: NewText, CategoryId: CategoryText, Quantity: Quantity, id: FindId })
        setLoading(true);

        setShowUpdate(false);
        toast.success("Update a product success!")
    }

    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete('/create-a-product', { data: { id: FindId } });
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
                    <div className='product-container'>
                        <div className='title-table'>
                            <h2>Product List</h2>
                            <button onClick={() => setShowCreate(true)}>Add new</button>
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
                                    product.map((e) => (
                                        <tr key={e.id}>
                                            <th>{e.id}</th>
                                            <td>{e.Name}</td>
                                            <td>{e.Detail}</td>
                                            <td>
                                                <button onClick={() => HandleClickDetail(e)}>Detail</button>
                                                {/* <button onClick={() => HandleClickEdit(e)}>Edit</button>
                                            <button onClick={() => HandleClickDelete(e)}>Delete</button> */}
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>

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
