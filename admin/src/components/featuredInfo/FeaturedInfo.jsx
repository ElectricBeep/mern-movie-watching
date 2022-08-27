import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedInfo() {
    //For movies
    const [addedMovies, setAddedMovies] = useState([]);
    const [moviePrecentage, setMoviePrecentage] = useState(0);
    //For users
    const [newUsers, setNewUsers] = useState([]);
    const [userPrecentage, setUserPrecentage] = useState(0);
    //For lists
    const [newLists, setNewLists] = useState([]);
    const [listPrecentage, setListPrecentage] = useState(0);

    //Fetch movies stats
    useEffect(() => {
        const getMoviesStats = async () => {
            try {
                const res = await axios.get("/movies/stats", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setAddedMovies(res.data);
                setMoviePrecentage((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getMoviesStats();
    }, []);

    //Fetch users stats
    useEffect(() => {
        const getUsersStats = async () => {
            try {
                const res = await axios.get("/users/stats", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setNewUsers(res.data);
                setUserPrecentage((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getUsersStats();
    }, []);

    //Fetch lists stats
    useEffect(() => {
        const getListsStats = async () => {
            try {
                const res = await axios.get("/lists/stats", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setNewLists(res.data);
                setListPrecentage((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getListsStats();
    }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">New Movies/Series</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{addedMovies[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(moviePrecentage)}{" "}
                        {moviePrecentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">New Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{newUsers[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(userPrecentage)}{" "}
                        {userPrecentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">New Lists</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{newLists[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(listPrecentage)}{" "}
                        {listPrecentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
