import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.message = '';
            state.isError = false;
            state.isSuccess = false;
        },
        logOut: (state) => {
            localStorage.removeItem('SessionWebToken');
            state.user=null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            register.pending,
            (state) =>{
                state.isLoading = true
            }
        )
        .addCase
        (
            register.fulfilled,
            (state,action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }
        )
        .addCase(
            register.rejected,
            (state,action) =>{
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload;
            }
        )
        .addCase(
            login.pending,
            (state) =>{
                state.isLoading = true
            }
        )
        .addCase(
            login.fulfilled,
            (state,action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }
        )
        .addCase(
            login.rejected,
            (state,action) =>{
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload;
            }
        )
    }
})

export const register = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try{
        return await authService.register(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const login = createAsyncThunk('auth/login',async (user,thunkAPI)=>{
    try{
        return await authService.login(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const {reset,logOut} = authSlice.actions
export default authSlice.reducer
