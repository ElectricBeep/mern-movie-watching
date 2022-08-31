import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
        history.push("/");
    };

    return (
        <div className="login">
            <form action="" className="loginForm">
                <input
                    type="text"
                    placeholder="Email"
                    className="loginInput"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="loginButton"
                    onClick={handleLogin}
                    disabled={isFetching}
                >
                    {isFetching ? "Processing..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login