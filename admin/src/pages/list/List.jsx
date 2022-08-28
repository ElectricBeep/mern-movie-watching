import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
    //To get list
    const [list, setList] = useState([]);
    //For updating list
    const [updatedList, setUpdatedList] = useState({});

    const location = useLocation();
    const listId = location.pathname.split("/")[2];

    //Fetch list
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get("https://mern-moviewatching.herokuapp.com/api/lists/find/" + listId, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setList(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        getList();
    }, [listId])

    //Getting info for updating
    const handleChange = (e) => {
        setUpdatedList((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    };

    //Updating
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("https://mern-moviewatching.herokuapp.com/api/lists/" + listId, updatedList, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                }
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie/Series</h1>
                <Link to="/newlist">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list?.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list?.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input
                            type="text"
                            placeholder={list?.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Type</label>
                        <input
                            type="text"
                            placeholder={list?.type}
                            name="year"
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder={list?.genre}
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>List Content</label>
                        <textarea
                            type="text"
                            placeholder={list?.content}
                            name="content"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="productFormRight">
                        <button
                            className="productButton"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
