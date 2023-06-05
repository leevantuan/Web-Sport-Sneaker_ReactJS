import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../../../routers/axiosCustom'
import './category.scss'

import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

export default function Category() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [CategoryText, setCategoryText] = useState("")
    const [MadeInText, setMadeInText] = useState("")

    const [FindId, setFindId] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/categories');
            setCategory(res.data.data);
            setLoading(false);
        }
        fetchPosts();
    }, [loading])
    const HandleCreate = async () => {
        setLoading(true)
        await axios.post('/create-a-category', { CategoryName: CategoryText, MadeIn: MadeInText });
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
        await axios.put('/create-a-category', { CategoryName: CategoryText, MadeIn: MadeInText, id: FindId });
        setLoading(false)

        setShowUpdate(false);
        setCategoryText("");
        setMadeInText("");
        toast.success(`Update with ID ${FindCategory.id} success!`);

    }

    const HandleDelete = async () => {
        setLoading(true)
        await axios.delete('/create-a-category', { data: { id: FindId } });
        setLoading(false)

        setFindId("");
        setShowDelete(false);
        toast.success(`Delete a category success!`);
    }
    return (
        <main>
            <div className='category-container'>
                <div className='title-table'>
                    <h2>Category List</h2>
                    <button onClick={() => setShowCreate(true)}>Add new</button>
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
                            category.map((e) => (
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
    )
}
