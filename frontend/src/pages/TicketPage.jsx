import { useEffect,useState,useRef } from "react"
import { useNavigate,Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import loadingSvg from "../resources/loading.svg"
import { RiDeleteBin5Line, RiH2 } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'
import { BsList } from "react-icons/bs";
import { deleteTicket, fetchTickets,updateTicket } from "../features/ticket/ticketSlice";
import { toast } from 'react-toastify'
import { reset } from "../features/ticket/ticketSlice";
import { fetchNotes, resetNotes,createNote } from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";

function TicketPage()
{

    const noteContentInput = useRef('');
    const noteAuthorInput= useRef('');

    const [editingTicket,isEditingTicket] = useState(false);
    const [addingNote, isAddingNote] = useState(false);
    const [ticketInfo,setTicketInfo] = useState({});
    const [formData,setFormData] = useState({
        product : '',
        description:''
    });
    const [noteData,setNoteData] = useState({
        author: '',
        content: ''
    });
    const [ticketDate,setTicketDate] = useState('');
    const updateDesc = useRef('');


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const ticketId=params.id;

    const {isLoading,isError,isSuccess,tickets,message} = useSelector(state => state.ticket);
    const noteState = useSelector(state => state.notes);

    const submitDeleteTicket = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you'd like to delete this ticket?")){
            dispatch(deleteTicket(ticketId));
        }
    }

    const submitEditData = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you'd like to submit this edit?")){
            let ticketDesc = updateDesc.current.value;
            let updateObj = {product:ticketInfo.product,description:ticketDesc};
            dispatch(updateTicket({ticket_id:ticketId,ticket_info:updateObj}));
        }
    }

    const submitNote = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you'd like to submit this note?")){
            let newNote = {id:ticketId,author:noteAuthorInput.current.value,content:noteContentInput.current.value};
            dispatch(createNote(newNote));  
            dispatch(fetchNotes(ticketId));  
        }
    }

    const cancelEdit = (e) => {
        e.preventDefault();
        isEditingTicket(false);
    }

    useEffect(()=>{
        if(Object.keys(ticketInfo).length>0)
        {
            setTicketDate(`${ticketInfo.createdAt.slice(0,10)} ${ticketInfo.createdAt.slice(11,19)}`);
            setFormData({
                product:ticketInfo.product,
                description:ticketInfo.description
            })
        }
    },[ticketInfo])

    useEffect(()=>{
        
        if(isError)
        {
            toast.error(message);
        }

        if(isSuccess)
        {
            toast.success('Ticket deleted succesfully');
            dispatch(fetchTickets());
            navigate('/complaints')
        }

        dispatch(reset());
    },[isSuccess,isError])


    const setEditing = (e) => {
        e.preventDefault();
        isEditingTicket(!editingTicket);
    }

    useEffect(() => {
        setTicketInfo(tickets.filter((item) => item._id===ticketId)[0]);
        setFormData(
            {
                product:ticketInfo.product,
                description:ticketInfo.description
            }
        )
        dispatch(fetchNotes(ticketId));
    },[]);
    
    useEffect(() => {

        if(noteState.isError)
        {
            toast.error('Failed to fetch notes!');
        }

        dispatch(resetNotes());

    },[noteState.isSuccess,noteState.isError]);

    if( ticketInfo && noteState.notes && !isLoading && !noteState.isLoading)
    {
        return(
            <main className="page-layout">
                <div className="single-ticket-container">
                    <Link to='/complaints'>
                        <div className="ticket-header-create ticket-link-back"  style={{margin:'none',position:'relative','right':'6px'}}>
                            <BsList className="complaint-list-link-logo"/>
                            Back to ticket list
                        </div>
                    </Link>
                    <div className="single-ticket-data-flow">
                        <div className="single-ticket-data">
                            <div className="single-ticket-key">
                                <b>
                                    Product
                                </b>
                            </div>
                                <div className="single-ticket-value">
                                    {ticketInfo.product}
                                </div>
                            <div className="single-ticket-key">
                                    <b>
                                        Description
                                    </b>
                            </div>
                            {
                                (editingTicket)
                                ?(
                                    <textarea id="description-editing" type='text' name='description' ref={updateDesc} value={formData.description}
                                    onChange={(e)=>{setFormData({...formData, [e.target.name]:e.target.value})}}/>
                                )
                                :(
                                    <div className="single-ticket-value">
                                        {ticketInfo.description}
                                    </div>
                                )
                            }
                            
                            <div className="single-ticket-key">
                                    <b>
                                        Created
                                    </b>
                            </div>
                            <div className="single-ticket-value">
                                {ticketDate}
                            </div>
                        </div>
                        <div className="single-data-actions">
                            <RiDeleteBin5Line className="delete-ticket-logo single-data-action-logo" onClick={submitDeleteTicket}/>
                            {
                                (editingTicket)
                                ?(
                                    <BiEditAlt className="edit-ticket-logo single-data-action-logo action-logo-toggled" disabled/>   
                                )
                                :(
                                    <BiEditAlt className="edit-ticket-logo single-data-action-logo" onClick={setEditing}/>   
                                )
                            }
                        </div>
                    </div>
                    <div className="edit-ticket-actions">
                        <div className="submit-ticket-edit" style={{'display' : (editingTicket) ? 'block' : 'none' }} onClick={submitEditData}>
                            Submit changes
                        </div>
                        <div className="submit-ticket-edit" style={{'display' : (editingTicket) ? 'block' : 'none' }} onClick={cancelEdit}>
                            Cancel
                        </div>
                    </div>
                    <div className="notes-container">
                    <div className="notes-title">Note section</div>
                    {
                    (noteState.notes.length>0)
                    ?(
                    noteState.notes.map((item) => {
                        return <NoteItem key={item._id} noteData={item} />
                    })
                    )
                    :(
                    <h1>No notes found for this ticket</h1>
                    )
                    }
                    </div>
                    <div className= {(addingNote) ? "note-addition-container" : "note-addition-container note-hover"}
                     onClick={(!addingNote) ? (e) => isAddingNote(true): (e) => void(0)}>
                        <BiEditAlt className="note-add-logo" style={{display:(addingNote) ? 'none' : 'block'}}/>
                        {
                            (addingNote)
                            ?(
                                <form>
                                    <div className='note-add'>
                                        <input ref={noteContentInput} placeholder="Content" className="note-form-input" type="text" />
                                        <input ref={noteAuthorInput} placeholder="Author" list="author" className="note-form-input"/>
                                        <datalist id='author'>
                                            <option value="Admin" />
                                            <option value="User" />
                                        </datalist>
                                        <div className="note-submit" onClick={submitNote}>
                                            Submit note
                                        </div>
                                        <div className="note-submit" onClick={() => {isAddingNote(false);}}>
                                            Cancel submition
                                        </div>
                                    </div>
                                </form>
                            )
                            :(
                                <div>Add a note</div>
                            )
                        }
                        
                    </div>
                </div>
            </main>
            
        )
    }
    else{
        return(
            <main className="page-layout">
                <div id="loading-container">
                    <img src={loadingSvg} className="loading-svg" alt="Page is loading..." />
                </div>
            </main>
        )
    }
}

export default TicketPage