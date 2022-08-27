import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import "./user.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

export default function User() {
    //For setting user
    const [user, setUser] = useState([]);
    //To select img for upload
    const [file, setFile] = useState(null);
    //To select other inputs for upload
    const [inputs, setInputs] = useState({});
    //To display success message
    const [successful, setSuccessful] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    //Fetch user
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get("/users/find/" + userId, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [userId]);

    //For updating
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    //Updating
    const handleUpdate = (e) => {
        e.preventDefault();
        if (file !== null) {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log("Upload is paused");
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //If there is new img included in put request
                        const updateInfo = { ...inputs, profilePic: downloadURL };
                        const id = userId;
                        const updateUser = async () => {
                            try {
                                const res = await axios.put("/users/" + id, updateInfo, {
                                    headers: {
                                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                                    }
                                });
                                console.log(res.data);
                            } catch (err) {
                                console.log(err);
                            }
                        };
                        updateUser();
                        setSuccessful(true);
                        setTimeout(function () {
                            setSuccessful(false);
                        }, 2500);
                    });
                }
            );
        } else {
            //If there is no new img, just text
            const id = userId;
            const updateInfo = { ...inputs };
            const updateUser = async () => {
                try {
                    const res = await axios.put("/users/" + id, updateInfo, {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    });
                    console.log(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            updateUser();
            setSuccessful(true);
            setTimeout(function () {
                setSuccessful(false);
            }, 2500);
        }
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newuser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={user?.profilePic || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user?.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user?.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{moment(user.createdAt).fromNow()}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.number || "unknown number"}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user?.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user?.address || "unknown address"}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={user?.username}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={user?.name}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder={user?.lastname}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={user?.email}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder={user?.phone}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder={user?.address}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <label>Set New Image</label>
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="" className="userUpdateImg" />
                                ) : (
                                    <img
                                        className="userUpdateImg"
                                        src={user?.profilePic || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                                        alt=""
                                    />
                                )}
                                <input
                                    name="profilePic"
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            {successful && (
                                <span className="userUpdateMessage">
                                    Update successful!
                                </span>
                            )}
                            <button className="userUpdateButton" onClick={handleUpdate}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
