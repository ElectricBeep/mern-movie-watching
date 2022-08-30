import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

export default function Register() {
    const [user, setUser] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    };


    const handleFinish = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, user);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="assets/logo.png"
                        alt=""
                    />
                    <div className="buttons">
                        <Link to="/login">
                            <button className="loginButton">Log in</button>
                        </Link>
                        <Link to="/">
                            <button className="loginButton">Home</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1>Watch movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Watch anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create account.
                </p>
                {open === false ? (
                    <div className="input">
                        <input type="email" placeholder="email address" name="email" onChange={handleChange} />
                        <button className="registerButton" onClick={() => setOpen(true)}>
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="username" placeholder="username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="password" name="password" onChange={handleChange} />
                        <button className="registerButton" onClick={handleFinish}>
                            Start
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
