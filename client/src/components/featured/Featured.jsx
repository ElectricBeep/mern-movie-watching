import "./featured.scss";
import { PlayArrow, InfoOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

export default function Featured({ type, setGenre }) {
    const [randomMovie, setRandomMovie] = useState({});
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRandomContent = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}movies/random?type=${type}`
                );
                setRandomMovie(res.data[0]);
                setLoading(false);
            } catch (err) {
                console.log(err);
            };
        };
        getRandomContent();
    }, [type]);

    //Set genre to null when transfering pages so I get lists rendered again
    useEffect(() => {
        if (type === "newPopular" || type === "") {
            setGenre(null);
        };
    }, [type, setGenre]);

    return (
        <div className="featured">
            <div className="category">
                <span>{type === "movie" ? "Movies" : type === "series" ? "Series" : type === "" ? "Welcome to Filmflex" : "New and Popular"}</span>
                {(type === "movie" || type === "series") && (
                    <select name="ganre" id="ganre" onChange={(e) => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="">Show all</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                )}
            </div>
            {loading ? (
                <Spinner message="Loading..." />
            ) : (
                <>
                    <img src={randomMovie.img} alt="" />
                    <div className="info">
                        {randomMovie?.imgTitle && (
                            <img src={randomMovie?.imgTitle} alt="" />
                        )}
                        {open && (
                            <span className="desc">{randomMovie?.desc}</span>
                        )}
                        <div className="buttons">
                            <Link to="/watch" state={{ randomMovie }} className="link">
                                <button className="play">
                                    <PlayArrow />
                                    <span>Play</span>
                                </button>
                            </Link>
                            <button className="more" onClick={() => setOpen(!open)}>
                                <InfoOutlined />
                                <span>Info</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
