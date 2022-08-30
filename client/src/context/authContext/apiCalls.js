import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

//Login
export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};