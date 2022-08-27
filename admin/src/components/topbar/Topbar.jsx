import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthAction";
import { Link } from "react-router-dom";

export default function Topbar() {
    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to="/" className="link">
                        <span className="logo">MovieWatching</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topbarNotificationsText">No notifications</span>
                    </div>
                    <span className="logoutButton" onClick={handleLogout}>
                        Log out
                    </span>
                    <img src={user?.profilePic || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
