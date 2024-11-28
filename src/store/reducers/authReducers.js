const DEFAULT_STATE = {
    authData: JSON.parse(localStorage.getItem("authData")) || null,
};
// token ada didalam authData

    export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("authData", JSON.stringify(action.payload.authData));
            return { ...state, authData: action.payload.authData};
        case "LOGOUT":
            localStorage.removeItem("authData");
            return { ...state, authData: null}
        // case "REFRESH_TOKEN":
        //     const newToken = action.payload.token;
        //     // disini pertanyaanya
        //     const newAuthData = {
        //         ...state.authData,
        //         token: newToken
        //     }
        //    localStorage.setItem("authData", JSON.stringify(newAuthData));
        //     return { ...state, authData: newAuthData};
        default:
            return state
    }
}
