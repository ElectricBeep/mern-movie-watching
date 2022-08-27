import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WidgetSm() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("users?new=true",
                    {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    }
                );
                setNewUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={user.profilePic || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <Link to={`user/${user._id}`} className="link">
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
