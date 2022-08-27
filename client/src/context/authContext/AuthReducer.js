const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        case "ADD_TO_LIST":
            return {
                ...state,
                user: {
                    ...state.user,
                    likedMovies: [...state.user.likedMovies, action.payload]
                }
            };
        case "REMOVE_FROM_LIST":
            return {
                ...state,
                user: {
                    ...state.user,
                    likedMovies: state.user.likedMovies.filter(
                        (movie) => movie !== action.payload
                    )
                }
            };
        default:
            return { ...state }
    };
};

export default AuthReducer;