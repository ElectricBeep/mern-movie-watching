import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

//Login
export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://mern-moviewatching.herokuapp.com/api/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};