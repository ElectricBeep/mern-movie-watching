import { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./settings.scss";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Settings = () => {
    const [userCreds, setUserCreds] = useState("");
    const [file, setFile] = useState(null);
    //For displaying message
    const [updatedSuccess, setUpdatedSuccess] = useState(false);

    const { user } = useContext(AuthContext);
    const userId = user._id;

    const handleChange = (e) => {
        setUserCreds((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    };

    const handleUpdated = (e) => {
        e.preventDefault();
        if (!file) {
            const updateUser = async () => {
                try {
                    await axios.put("https://mern-moviewatching.herokuapp.com/api/users/" + userId, userCreds, {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    });
                    setUpdatedSuccess(true);
                    setTimeout(function () {
                        setUpdatedSuccess(false);
                    }, 3500);
                } catch (err) {
                    console.log(err);
                }
            }
            updateUser();
        } else {
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
                        const userCredsWithImg = { ...userCreds, profilePic: downloadURL };
                        const updateUserWithImage = async () => {
                            try {
                                await axios.put("https://mern-moviewatching.herokuapp.com/api/users/" + userId, userCredsWithImg, {
                                    headers: {
                                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                                    }
                                });
                                setUpdatedSuccess(true);
                                setTimeout(function () {
                                    setUpdatedSuccess(false);
                                }, 6000);
                            } catch (err) {
                                console.log(err);
                            }
                        };
                        updateUserWithImage();
                    });
                }
            );
        }
    };

    return (
        <>
            <Navbar />
            <div className="settings">
                <div className="settingsLeft">
                    <div className="settingsLeftWrapper">
                        <div className="settingsTitle">Update your account</div>
                        <form className="settingsForm">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={user?.name ? user.name : "Your Name"}
                                onChange={handleChange}
                            />
                            <label>Lastname</label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder={user?.lastname ? user.lastname : "Your Lastname"}
                                onChange={handleChange}
                            />
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder={user.email}
                                onChange={handleChange}
                            />
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder={user.username}
                                onChange={handleChange}
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={handleChange}
                            />
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder={user?.phone ? user.phone : "Your Phone Number"}
                                onChange={handleChange}
                            />
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder={user?.address ? user.address : "Your Address"}
                                onChange={handleChange}
                            />
                            <div className="changeProfilePic">
                                <div className="changeProfilePicTitle">Profile Picture</div>
                                <label htmlFor="profilePic">
                                    <FileUploadIcon className="icon" />
                                </label>
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="" className="updateImg" />
                                ) : (
                                    <img src={user?.profilePic ? user.profilePic : "assets/netflixAvatar.png"} alt="" className="updateImg" />
                                )}
                                <input
                                    type="file"
                                    id="profilePic"
                                    name="profilePic"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <button onClick={handleUpdated}>Update</button>
                            {updatedSuccess && (
                                <div className="updateMessage">
                                    Your account has been updated!
                                    <br />
                                    <br />
                                    You may need to log in again for changes to take effect!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                <div className="settingsRight">
                    <img src="assets/logo.png" alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Settings