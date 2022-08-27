import "./navbar.scss";
import { Search, Notifications, ArrowDropDown, } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthAction";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false); //For navbar background
    const [open, setOpen] = useState(false); //For searchbar
    const [children, setChildren] = useState(false); //For children button

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const childrenRef = useRef();

    //Children css settings
    const handleClick = () => {
        if (children === false) {
            setChildren(true);
            childrenRef.current.style.color = "#298b57";
            childrenRef.current.style.textDecoration = "underline";
        } else {
            setChildren(false);
            childrenRef.current.style.color = "white";
            childrenRef.current.style.textDecoration = "none";
        };
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="assets/logo.png" alt="" />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarMainLinks">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarMainLinks">Movies</span>
                    </Link>
                    <Link to="/newPopular" className="link">
                        <span>New and Popular</span>
                    </Link>
                    {user && (
                        <Link to="/mylist" className="link">
                            <span>My list</span>
                        </Link>
                    )}
                </div>
                <div className="right">
                    {open && (
                        <input type="text" className="navbarInput" placeholder="Search..." />
                    )}
                    <Search className="icon" onClick={() => setOpen(!open)} />

                    <div className="children">
                        <span ref={childrenRef} onClick={handleClick}>CHILDREN</span>
                        <div className="childrenOptions">
                            <span>Click to display only child-frendly content</span>
                        </div>
                    </div>
                    {user ? (
                        <>
                            <div className="notifications">
                                <Notifications className="icon" />
                                <div className="notificationsOptions">
                                    <span>No notifications</span>
                                </div>
                            </div>
                            <img
                                src={user?.profilePic ?
                                    user.profilePic :
                                    "assets/netflixAvatar.png"
                                }
                                alt=""
                            />
                            <div className="profile">
                                <ArrowDropDown className="icon" />
                                <div className="options">
                                    <Link to="/settings" className="link">
                                        <span>Settings</span>
                                    </Link>
                                    <span onClick={handleLogout}>Log Out</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="link">
                            <div className="navbarLoginContainer">
                                Login/Register
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
