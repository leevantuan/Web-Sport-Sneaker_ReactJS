import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../../../routers/axiosCustom'
import './image.scss'

import AuthNavbar from '../../../components/Auth-navbar/Auth-navbar';

import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

export default function Image() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState([]);

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [ImageLinkText, setImageLinkText] = useState("")
    const [ProductIdText, setProductIdText] = useState("")

    const [FindId, setFindId] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/images');
            setImage(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])
    const HandleCreate = async () => {
        setLoading(true)
        await axios.post('/create-a-image', { ImageLink: ImageLinkText, ProductId: ProductIdText });
        setLoading(false)

        setShowCreate(false);
        setImageLinkText("");
        setProductIdText("");
        toast.success("Create a image success!")
    }

    let FindImage = []
    if (FindId !== "") {
        FindImage = image.find((e) => e.id === FindId)
    }

    const HandleClickEdit = (event) => {
        setFindId(event.id);
        setShowUpdate(true);

        if (FindImage !== []) {
            setImageLinkText(event.ImageLink);
            setProductIdText(event.ProductId);
        }
    }

    const HandleClickDelete = (event) => {
        setFindId(event.id);
        setShowDelete(true);
    }

    const HandleUpdate = async (FindCategory) => {
        setLoading(true)
        await axios.put('/create-a-image', { ImageLink: ImageLinkText, ProductId: ProductIdText, id: FindId });
        setLoading(false)

        setShowUpdate(false);
        setImageLinkText("");
        setProductIdText("");
        toast.success(`Update with ID ${FindCategory.id} success!`);
    }

    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete('/create-a-image', { data: { id: FindId } });
        setLoading(false)

        setFindId("");
        setShowDelete(false);
        toast.success(`Delete a category success!`);
    }
    return (
        <div className='container'>
            <AuthNavbar />
            <main>
                <div className='category-container'>
                    <div className='title-table'>
                        <h2>Image List</h2>
                        <button onClick={() => setShowCreate(true)}>Add new</button>
                    </div>
                    <table className='table-category' >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PRODUCT ID</th>
                                <th>IMAGE LINK</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                image.map((e) => (
                                    <tr key={e.id}>
                                        <th>{e.id}</th>
                                        <td>{e.ProductId}</td>
                                        <td>{e.ImageLink}</td>
                                        <td>
                                            <button onClick={() => HandleClickEdit(e)}>Edit</button>
                                            <button onClick={() => HandleClickDelete(e)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                </div>

                {/* Create a category */}
                <div className='modal-create-category' hidden={showCreate ? false : true}>
                    <div className='create-category'>
                        <div className='title-create-category'>
                            <h2>Create a Image</h2>
                            <i onClick={() => setShowCreate(false)} ><AiOutlineClose /></i>
                        </div>
                        <form>
                            <div className='input-category'>
                                <label>Image link: </label>
                                <input type='text' placeholder='http:// ...' onChange={(e) => setImageLinkText(e.target.value)} required />
                            </div>
                            <div className='input-category'>
                                <label>Product Id: </label>
                                <input type='text' placeholder='Product Id ...' onChange={(e) => setProductIdText(e.target.value)} required />
                            </div>
                            <button className='btn-category' onClick={() => HandleCreate()}>Create</button>
                        </form>
                    </div>
                </div>

                {/* update a category */}
                <div className='modal-create-category' hidden={showUpdate ? false : true}>
                    <div className='create-category'>
                        <div className='title-create-category'>
                            <h2>Update a Image</h2>
                            <i onClick={() => setShowUpdate(false)} ><AiOutlineClose /></i>
                        </div>
                        <div>
                            <div className='input-category'>
                                <label>Image link:: </label>
                                <input type='text' value={ImageLinkText} onChange={(e) => setImageLinkText(e.target.value)} />
                            </div>
                            <div className='input-category'>
                                <label>Product Id: </label>
                                <input type='text' value={ProductIdText} onChange={(e) => setProductIdText(e.target.value)} />
                            </div>
                            <h2 hidden>{FindImage.id}</h2>
                            <button className='btn-category' onClick={() => HandleUpdate(FindImage)}>Update</button>
                        </div>
                    </div>
                </div>

                {/* delete a category */}
                <div className='modal-create-category' hidden={showDelete ? false : true}>
                    <div className='create-category'>
                        <div className='title-create-category'>
                            <h2>Delete a Image</h2>
                            <i onClick={() => setShowDelete(false)} ><AiOutlineClose /></i>
                        </div>
                        <div>
                            <h2>Are you sure delete image with ID: {FindImage.id}?</h2>
                            <button className='btn-category' onClick={() => HandleDelete()}>Delete</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>

    )
}

