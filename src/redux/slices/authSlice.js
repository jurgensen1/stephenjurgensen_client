import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth')

    if (isAuth && JSON.parse(isAuth) === true) {
        return true
    }

    return false
}

const initialState = {
    isAuth: userAuthFromLocalStorage(),
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticateUser: (state) => {
            state.isAuth = true;
        },
        unauthenticateUser: (state) => {
            state.isAuth = false;
        },

    },
});

export const { unauthenticateUser, authenticateUser } = authSlice.actions;

export const selectIsAuth = (state) => state.auth.isAuth;


export default authSlice.reducer;
