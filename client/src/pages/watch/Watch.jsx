import "./watch.scss";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
    //Getting movie data from ListItem component
    const location = useLocation();
    const movie = location.state.movie

    //Getting movie data from Featured component
    const randomMovie = location.state.randomMovie;

    return (
        <div className="watch">
            <Link to="/" className="link">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video
                src={movie?.video ? movie.video : randomMovie.video}
                className="video"
                autoPlay
                progress="true"
                controls
            />
        </div>
    )
}
