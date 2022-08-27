import "./newProduct.css";
import { useContext, useState } from "react";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
    //For inputs
    const [movie, setMovie] = useState({});
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    //For firebase uploading
    const [uploaded, setUploaded] = useState(0);
    //To display upload prgoress
    const [uploadProgress, setUploadProgress] = useState("");

    const history = useHistory();

    const { dispatch } = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

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
                        setMovie((prev) => {
                            return { ...prev, [item.label]: downloadURL };
                        });
                        //Increase uploaded number by 1 for each upload
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovie(movie, dispatch);
        history.push("/movies");
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}

                    />
                </div>
                <div className="addProductItem">
                    <label>Title Image</label>
                    <input
                        type="file"
                        id="imgTitle"
                        name="imgTitle"
                        onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail Image</label>
                    <input
                        type="file"
                        id="imgSm"
                        name="imgSm"
                        onChange={(e) => setImgSm(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="John Wick"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="description"
                        name="desc"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input
                        type="text"
                        placeholder="2022"
                        name="year"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input
                        type="text"
                        placeholder="genre"
                        name="genre"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input
                        type="text"
                        placeholder="duration"
                        name="duration"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Age Limit</label>
                    <input
                        type="text"
                        placeholder="limit"
                        name="limit"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                    <input
                        type="file"
                        name="trailer"
                        onChange={(e) => setTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input
                        type="file"
                        name="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Is Series?</label>
                    <select name="isSeries" id="active" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                {uploaded === 5 ? (
                    <button className="addProductButton" onClick={handleSubmit}>Create</button>
                ) : (
                    <button className="addProductButton" onClick={handleUpload}>
                        {uploadProgress ? (
                            Math.floor(uploadProgress)
                        ) : (
                            "Upload"
                        )}
                    </button>
                )}
            </form>
        </div>
    );
}
