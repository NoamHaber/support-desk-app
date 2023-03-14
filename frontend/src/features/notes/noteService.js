import axios from "axios"

const API_URL="/api/notes"

// Fetch all notes for a ticket

const fetchNotes = async (token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}` 
        }
    }

    const response = await axios.get(`${API_URL}`,config)    

    return response.data;
}

const createNote = async (noteData, token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}`, noteData, config);

    return response.data;
}


const noteService = {
    fetchNotes,
    createNote
}
export default noteService