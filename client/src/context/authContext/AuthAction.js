//LOGIN
export const loginStart = () => ({
    type: "LOGIN_START"
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFailure = () => ({
    type: "LOGIN_FAILURE"
});

//LOGOUT
export const logout = () => ({
    type: "LOGOUT"
});

//ADD TO MY LIST
export const addToList = (movieId) => ({
    type: "ADD_TO_LIST",
    payload: movieId
});

//REMOVE FROM MY LIST
export const removeFromList = (movieId) => ({
    type: "REMOVE_FROM_LIST",
    payload: movieId
});