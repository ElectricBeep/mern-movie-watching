import "./listItem.scss";
import { PlayArrow, Add, Remove, ThumbUpAltOutlined, ThumbDownAltOutlined, ThumbUpAlt, ThumbDownAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import Spinner from "../spinner/Spinner";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    //For like/dislike
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}movies/find/` + item);
                setMovie(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            };
        };
        getMovie();
    }, [item]);

    const handleLike = () => {
        if (dislike === false && like === false) {
            setLike(true);
        } else if (dislike === true && like === false) {
            setDislike(false);
            setLike(true);
        } else if (dislike === false && like === true) {
            setLike(false);
        }
    };

    const handleDislike = () => {
        if (dislike === false && like === false) {
            setDislike(true);
        } else if (dislike === false && like === true) {
            setLike(false);
            setDislike(true);
        } else if (dislike === true && like === false) {
            setDislike(false);
        }
    };

    //Getting user id for adding movie to the myList
    const { user, dispatch } = useContext(AuthContext);
    const userId = user?._id;

    //For checking if movieId is already in the myList
    const alreadyInList = user?.likedMovies?.includes(item);

    //For displaying added/removed message
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    //Adding movie to the myList
    const handleMyList = (id) => {
        const addMovie = async () => {
            if (alreadyInList) {
                try {
                    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}users/${userId}`, {
                        likedMovies: id
                    }, {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    });
                    dispatch({ type: "REMOVE_FROM_LIST", payload: id })
                    console.log(res.data);
                    setAdded(false);
                    setRemoved(true);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}users/${userId}`, {
                        likedMovies: id
                    }, {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    });
                    dispatch({ type: "ADD_TO_LIST", payload: id })
                    console.log(res.data);
                    setRemoved(false);
                    setAdded(true);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        addMovie();
    };

    return (
        <>
            {loading ? (
                <Spinner message="loading" />
            ) : (
                <div className="listItem"
                    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img src={movie?.imgSm} alt="" />
                    {isHovered && (
                        <>
                            <Link to="/watch" state={{ movie }}>
                                <video src={movie?.video} autoPlay={true} loop />
                            </Link >
                            <div className="itemInfo">
                                {added && <span className="addedMessage">Added to My List!</span>}
                                {removed && <span className="addedMessage">Removed from My List!</span>}
                                <div className="icons">
                                    <Link to="/watch" state={{ movie }} style={{ color: "inherit" }}>
                                        <PlayArrow className="icon" />
                                    </Link>
                                    {user && (
                                        <div className="addClick" onClick={() => handleMyList(movie._id)}>
                                            {alreadyInList ? (
                                                <Remove className="icon" />
                                            ) : (
                                                <Add className="icon" />
                                            )}
                                        </div>
                                    )}
                                    <div className="likeClick" onClick={handleLike}>
                                        {like ? (
                                            <ThumbUpAlt className="icon" />
                                        ) : (
                                            <ThumbUpAltOutlined className="icon" />
                                        )}
                                    </div>
                                    <div className="dislikeClick" onClick={handleDislike}>
                                        {dislike ? (
                                            <ThumbDownAlt className="icon" />
                                        ) : (
                                            <ThumbDownAltOutlined className="icon" />
                                        )}
                                    </div>
                                </div>
                                <div className="itemInfoTop">
                                    <span>{movie?.duration}</span>
                                    <span className="limit">{movie?.limit}</span>
                                    <span>{movie?.year}</span>
                                </div>
                                <div className="desc">{movie?.desc}</div>
                                <div className="ganre">{movie?.genre}</div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
