import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: null,
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const ticketSlice = createSlice(
{
    name:'ticket',
    initialState,
    reducers:{
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        logOutTickets: (state) => {
            state.tickets = null;
            state.ticket = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            createTicket.pending,
            (state) => {
                state.isLoading = true
            }
            )
            .addCase(
            createTicket.fulfilled,
            (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            }
            )
            .addCase(
                fetchTickets.pending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                createTicket.rejected,
                (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                fetchTickets.fulfilled,
                (state,action) =>{
                    state.tickets = action.payload;
                    state.isLoading = false;
                    state.isSuccess = true;
                }
            )
            .addCase(
                deleteTicket.pending,
                (state,action)=>{
                    state.isLoading=true;
                }
            )
            .addCase(
                deleteTicket.rejected,
                (state,action) => {
                    state.isError=true;
                    state.isLoading=false;
                    state.message=action.payload;
                }
            )
            .addCase(
                deleteTicket.fulfilled,
                (state,action) => {
                    state.isSuccess=true;
                    state.isLoading=true;
                }
            )
            .addCase(
                updateTicket.pending,
                (state,action) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                updateTicket.rejected,
                (state,action) => {
                    state.isError=true;
                    state.isLoading=false;
                    state.message=action.payload
                }
            )
            .addCase(
                updateTicket.fulfilled,
                (state,action) => {
                    state.isSuccess=true;
                    state.isLoading=false;
                }
            )
        }
    }
);

export const createTicket = createAsyncThunk('ticket/create',async (ticketData,thunkAPI)=>{
    try{
        return await ticketService.createTicket(ticketData,localStorage.getItem('SessionWebToken'));
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const fetchTickets = createAsyncThunk('ticket/fetchAll', async (thunkAPI) => {
    try{
        return await ticketService.fetchTickets(localStorage.getItem('SessionWebToken'));
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTicket = createAsyncThunk('ticket/deleteTicket', async (ticketId,thunkAPI) => {
    try{
        return await ticketService.deleteTicket(ticketId,localStorage.getItem('SessionWebToken'))
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateTicket = createAsyncThunk('ticket/updateTicket',async (updateObj,thunkAPI)=>{
    try{
        return await ticketService.updateTicket(updateObj,localStorage.getItem('SessionWebToken'));
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



export const {reset,logOutTickets} = ticketSlice.actions
export default ticketSlice.reducer