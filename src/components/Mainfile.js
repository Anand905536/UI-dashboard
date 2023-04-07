import { useState, useEffect } from "react";
import "./mainfile.css";
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { Button } from '@mui/material'
import { message } from 'antd';
import {AiFillLeftSquare} from 'react-icons/ai'
import {AiFillRightSquare} from 'react-icons/ai'
import {BsCaretLeftFill} from 'react-icons/bs'
import {BsCaretRightFill} from 'react-icons/bs'


export default function App() {
    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [onsearch, setOnsearch] = useState('')
    const [show, setShow] = useState([])

    useEffect(() => {
        fetch(
            "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
            .then((res) => res.json())
            .then((res) => setState(res))
            .catch((err) => console.error(err));
    }, []);


    // deleting data
    const toDelete = (selectedUser) => {
        let userAfterDeletion = state.filter((user) => {
            return user.id !== selectedUser;
        });
        setState(userAfterDeletion);
        setTimeout(() => {
        message.success('Item have been deleted');
        }, 100);
        
    };

    // pagination handled
    const pageChange = (item) => {
        if (item >= 1 && item <= (state.length + 4) / 10 && page !== item) {
            setPage(item);
        }
        console.log(item);
    };

    // converting to the ceil value so that it doesn't throw errr
    let totallength = Math.ceil(state.length / 10);


    // edit users
    const editUser = (id) => {
        window.alert("Not Working currently, fixing the bug")
    };

    // checkbox main
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const checkboxIds = state.slice(page * 10 - 10, page * 10).map((data) => data.id);
            setShow(checkboxIds);
        } else {
            setShow([]);
        }
    };


    // checking every checkbox  
    const handleCheckboxChange = (id) => {
        if (show.includes(id)) {
            setShow(show.filter((checkboxId) => checkboxId !== id));
        } else {
            setShow([...show, id]);
        }
    };


    // delete selected
    const deleteSelected = () => {

        const list = [...state];
        list.splice(0, 10);
        setState(list);
        setTimeout(() => {
            message.success('Selected Item(s) have been deleted');
            }, 100);
    };





    return (
        <>
            <div className="App">
                <div className="rendering_data">

                    {/* for searching details of user with name,mail id, mentor */}
                    <div ><input placeholder="Search by name,email or role" style={{ textAlign: "center" }} className="input_type" type="text" onChange={(e) => setOnsearch(e.target.value)} /></div>


                    {/* adding main title of column */}
                    <div className="main_title">

                        {/* checkbox for selecting all */}
                        <div><input type="checkbox" onChange={handleSelectAll} /></div>

                        <h4 className="name">Name</h4>
                        <h4 className="email">Email</h4>
                        <h4 className="role">Role</h4>
                        <h4 className="actions">Actions</h4>

                    </div>

                    <hr className="hr" />


                    {/* filtering data on the basis of search */}
                    {state.filter((ele) => {
                        if (ele === "") return state;
                        else if (
                            ele.id.includes(onsearch) ||
                            ele.name.includes(onsearch) ||
                            ele.email.includes(onsearch) ||
                            ele.role.includes(onsearch)
                        ) {
                            return state;
                        }
                    })

                        // returning desired result by slice method
                        .slice(page * 10 - 10, page * 10).map((data, idx) => {
                            return (
                                <>
                                    <div className="every_item" key={idx} style={{ display: "flex" }}>
                                        <div><input type="checkbox" checked={show.includes(data.id)} onChange={() => handleCheckboxChange(data.id)} /></div>
                                        <p className="name">{data.name}</p>
                                        <p className="email">{data.email}</p>
                                        <p className="role">{data.role}</p>
                                        <div className="actions">
                                            <AiFillEdit className="action1" onClick={() => editUser(data.id)} />
                                            <AiFillDelete className="action2" onClick={() => toDelete(data.id)} />
                                        </div>

                                    </div>
                                    <hr className="hr" />
                                </>
                            );
                        })}
                </div>
            </div>


            {/* pagination */}
            <div className="footer">

                <Button onClick={() => deleteSelected()} className="button" variant="contained" color="primary" style={{ background: "#081014", color: "lightgrey" }}>
                    Delete All
                </Button>

                <div>
                    {state.length > 0 && (
                        <div className="pagination">

                            <span
                                className={page === 1 ? "disable" : ""}
                                onClick={() => pageChange(1)}
                            >
                               <AiFillLeftSquare size={25}/>
                            </span>

                            <span
                                className={page === 1 ? "disable" : ""}
                                onClick={() => pageChange(page - 1)}
                            >
                              <BsCaretLeftFill size={25}/>
                            </span>

                            {[...Array(totallength)].map((_, idx) => {
                                return (
                                    <span
                                        className={page === idx + 1 ? "selected" : ""}
                                        onClick={() => pageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </span>
                                );
                            })}

                            <span
                                className={page === 5 ? "disable" : ""}
                                onClick={() => pageChange(page + 1)}
                            >
                              <BsCaretRightFill size={25}/>
                            </span>

                            <span
                                className={page === 5 ? "disable" : ""}
                                onClick={() => pageChange(5)}
                            >
                               <AiFillRightSquare size={25}/>
                            </span>
                            
                        </div>
                    )}
                </div>

            </div>

        </>
    );
}











