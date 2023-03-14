import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const  initialState = {
    notes: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
}

const noteSlice = createSlice(
    {
        name: 'note',
        initialState,
        reducers:{
            resetNotes: (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = null;
            },
            logOutNotes : (state) => {
                state.notes=null
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                fetchNotes.pending,
                (state) => {
                    state.isLoading=true;
                }
            )
            .addCase(
                fetchNotes.rejected,
                (state,action) => {
                    state.isLoading=false;
                    state.isError=true;
                    state.message=action.payload;
                }
            )
            .addCase(
                fetchNotes.fulfilled,
                (state,action) => {
                    state.isLoading=false;
                    state.isSuccess=true;
                    state.notes=action.payload;
                }
            )
            .addCase(
                createNote.pending,
                (state) => {
                    state.isLoading=true;
                }
            )
            .addCase(
                createNote.rejected,
                (state,action) => {
                    state.isLoading=false;
                    state.isError=true;
                    state.message=action.payload;
                }
            )
            .addCase(
                createNote.fulfilled,
                (state) => {
                    state.isSuccess=true;
                    state.isLoading=false;
                }
            )
        }
    }
);

export const fetchNotes = createAsyncThunk( 'notes/fetchNotes', async (thunkAPI) => {
    try{
        return await noteService.fetchNotes(localStorage.getItem('SessionWebToken'));
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createNote = createAsyncThunk('notes/createNote' , async (noteData,thunkAPI) => {
    try {
        return await noteService.createNote(noteData,localStorage.getItem('SessionWebToken'),noteData);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const {resetNotes,logOutNotes} = noteSlice.actions
export default noteSlice.reducer