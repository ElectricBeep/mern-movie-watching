import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Product() {
    //To set movie
    const [movie, setMovie] = useState([]);
    //For updating
    const [updatedMovie, setUpdatedMovie] = useState({});
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    //For firebase uploading
    const [uploadProgress, setUploadProgress] = useState(null);

    //Getting movie id
    const location = useLocation();
    const movieId = location.pathname.split("/")[2];

    //Fetching movie
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}movies/find/${movieId}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        getMovie();
    }, [movieId]);

    //Setting text inputs
    const handleChange = (e) => {
        setUpdatedMovie((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    };

    //Upload
    const upload = (items) => {
        items.forEach((item) => {
            //Changing file name since we can't upload 2 files with same name
            const fileName = new Date().getTime() + item.label + item.file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, `/items/${fileName}`);
            //Created folder, then file name, then I provided file so it can be uploaded
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            //Show precentage of upload
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress('Upload is ' + progress + '% done');
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
                        setUpdatedMovie((prev) => {
                            return { ...prev, [item.label]: downloadURL };
                        });
                    });
                }
            );
        });
    };

    //For uploading
    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: "img" },
            { file: imgTitle, label: "imgTitle" },
            { file: imgSm, label: "imgSm" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" },
        ]);
    };

    //Updating
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}movies/${movieId}`, updatedMovie, {
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
                <Link to="/newmovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie?.img} alt="" className="productInfoImg" />
                        <span className="productName">{movie?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie?.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie?.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">age limit:</span>
                            <span className="productInfoValue">{movie?.limit}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">duration:</span>
                            <span className="productInfoValue">{movie?.duration}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">is series:</span>
                            <span className="productInfoValue">{movie?.isSeries ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input
                            type="text"
                            placeholder={movie?.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Movie Description</label>
                        <textarea
                            type="text"
                            placeholder={movie?.desc}
                            name="desc"
                            onChange={handleChange}
                        />
                        <label>Year</label>
                        <input
                            type="text"
                            placeholder={movie?.year}
                            name="year"
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder={movie?.genre}
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>Age Limit</label>
                        <input
                            type="number"
                            placeholder={movie?.limit}
                            name="limit"
                            onChange={handleChange}
                        />
                        <label>Duration</label>
                        <input
                            type="text"
                            placeholder={movie?.limit}
                            name="duration"
                            onChange={handleChange}
                        />
                        <label>Is Series?</label>
                        <select
                            name="isSeries"
                            id="active"
                            onChange={handleChange}
                        >
                            <option disabled>Set Value</option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <label>Trailer</label>
                        <input
                            type="file"
                            name="trailer"
                            id="trailer"
                            onChange={(e) => setTrailer(e.target.files[0])}
                        />
                        <label>Video</label>
                        <input
                            type="file"
                            name="video"
                            id="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <label>Cover Image</label>
                            {img ? (
                                <img src={URL.createObjectURL(img)} alt="" className="productUploadImg" />
                            ) : (
                                <img src={movie?.img} alt="" className="productUploadImg" />
                            )}
                            <input
                                type="file"
                                id="img"
                                name="img"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                        <div className="productUpload">
                            <label>Title Image</label>
                            {imgTitle ? (
                                <img src={URL.createObjectURL(imgTitle)} alt="" className="productUploadImg" />
                            ) : (
                                <img src={movie?.imgTitle} alt="" className="productUploadImg" />
                            )}
                            <input
                                type="file"
                                id="imgTitle"
                                name="imgTitle"
                                onChange={(e) => setImgTitle(e.target.files[0])}
                            />
                        </div>
                        <div className="productUpload">
                            <label>Thumbnail Image</label>
                            {imgSm ? (
                                <img src={URL.createObjectURL(imgSm)} alt="" className="productUploadImg" />
                            ) : (
                                <img src={movie?.imgSm} alt="" className="productUploadImg" />
                            )}
                            <input
                                type="file"
                                id="imgSm"
                                name="imgSm"
                                onChange={(e) => setImgSm(e.target.files[0])}
                            />
                        </div>
                        <span>
                            If you are updating any of the images, trailer or video,
                            <br />
                            please, click the <b>upload</b> button first and wait for upload to finish.
                            <br />
                            After that, click the <b>update</b> button to update.
                        </span>
                        <br />
                        <button
                            className="productButtonUpload"
                            onClick={handleUpload}
                        >
                            {uploadProgress ? (
                                Math.floor(uploadProgress)
                            ) : (
                                "Upload"
                            )}
                        </button>
                        <br />
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
