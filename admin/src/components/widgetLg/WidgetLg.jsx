import { useEffect } from "react";
import { useContext } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import "./widgetLg.css";
import moment from "moment";

export default function WidgetLg() {
    const { dispatch, movies } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest movies/series</h3>
            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Movie/Series</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Genre</th>
                        <th className="widgetLgTh">Type</th>
                    </tr>
                    {movies.slice(0, 8).map((movie) => (
                        <tr className="widgetLgTr" key={movie._id}>
                            <td className="widgetLgUser">
                                <img
                                    src={movie?.imgSm}
                                    alt=""
                                    className="widgetLgImg"
                                />
                                <span className="widgetLgName">{movie?.title}</span>
                            </td>
                            <td className="widgetLgDate">{moment(movie?.createdAt).fromNow()}</td>
                            <td className="widgetLgAmount">{movie?.genre}</td>
                            <td className="widgetLgStatus">{movie?.isSeries ? "Series" : "Movie"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}