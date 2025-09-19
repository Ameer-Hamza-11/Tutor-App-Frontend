import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    userDetails: null,
    address: null,
    education: [],
    isLoading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload)
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.userDetails = null;
            state.address = null;
            state.education = [];
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        setProfile: (state, action) => {
            if (action.payload.user !== undefined) {
                const normalizedUser = {
                    ...action.payload.user,
                    role: action.payload.user.role
                        ? action.payload.user.role
                        : state.user?.role || null, 
                };
        
                state.user = normalizedUser;
                localStorage.setItem("user", JSON.stringify(normalizedUser));
            }
        
            if (action.payload.userDetails !== undefined) state.userDetails = action.payload.userDetails;
            if (action.payload.address !== undefined) state.address = action.payload.address;
            if (action.payload.education !== undefined) state.education = action.payload.education;
        },
        updateProfileFromJob: (state, action) => {
            const { userDetails, address, education } = action.payload;
            state.userDetails = userDetails;
            state.address = address;
            if (education) state.education = education;
        },
    }
})

export const { setToken, logout, setProfile, updateProfileFromJob } = authSlice.actions;
export default authSlice.reducer;