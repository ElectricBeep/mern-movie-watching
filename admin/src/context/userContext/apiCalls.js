import axios from "axios";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./UserAction";

//Get users
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("users", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

//Delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

//Create user
export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post("auth/register", user);
        dispatch(createUserSuccess(res.data));
    } catch (err) {
        dispatch(createUserFailure());
    }
};