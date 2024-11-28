import { axiosInstance } from "../../lib/axios";


export const login = (authData) => ({
    type: "LOGIN",
    payload: { authData },
})

// export const tokenRefresh = (authData) => ({
//     type: "REFRESH_TOKEN",
//     payload: { authData },
// })

// perbedaan useSelector dan getState
// getState: Digunakan di luar konteks komponen React, biasanya dalam action creator asinkron atau middleware, untuk mendapatkan state saat ini.
// useSelector: Digunakan di dalam komponen React untuk berlangganan ke bagian state tertentu dan memicu re-render ketika state tersebut berubah.
export const refreshToken = () => {
    return async (dispatch, getState) => {
        const dataAuth = getState().auth.authData;
        try {
            if (!dataAuth.token) {
                console.log("no token found");
                return;
            }
            const response = await axiosInstance.get("/auth/refresh-token", {
                headers: {
                    Authorization: `Bearer ${dataAuth.token}`,
                },
            });
            const newToken = response.data.data.token;
            if (response.data.status.code === 201) {
                const newData = { ...dataAuth, token: newToken };
                dispatch(login(newData));
                console.log("token refreshed");
            } else {
                console.log("failed to refresh token");
            }
        } catch (error) {
            console.log(error.message);
        }
    };
  };