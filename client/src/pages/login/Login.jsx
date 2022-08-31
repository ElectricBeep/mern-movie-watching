import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch, error } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
        navigate("/");
    };

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img src="assets/logo.png" alt="" className="logo" />
                    <div className="buttons">
                        <Link to="/register">
                            <button className="registerButton">Sign Up</button>
                        </Link>
                        <Link to="/">
                            <button className="registerButton">Home</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>
                    {error && <span style={{ color: "red" }}>Something went wrong!</span>}
                    <span>
                        New to MovieWatching? <Link to="/register" className="link"><b>Sign up now.</b></Link>
                    </span>
                    <span>
                        Admin? <a href="https://admin-mern-moviewatching.netlify.app" rel="noreferrer" target="_blank" className="link"><b>Sign in</b></a>
                    </span>
                </form>
            </div>
        </div>
    )
}
