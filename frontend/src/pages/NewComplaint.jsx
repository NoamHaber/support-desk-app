import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";

import loadingSvg from "../resources/loading.svg" 
import { fetchTickets,createTicket,reset } from "../features/ticket/ticketSlice"
import { toast } from "react-toastify";
import { BsList } from 'react-icons/bs'

function NewComplaint()
{

    const productList = ['Iphone','Laptop','Smart watch','Webcam'];

    const {user} = useSelector(state => state.auth);
    const {isError,isSuccess,message,isLoading} = useSelector(state => state.ticket);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    },[])

    useEffect(()=>{
        dispatch(reset());
        if(isError)
        {
            toast.error(message);
        }
        if(isSuccess)
        {
            toast.success('Ticket was created!')
            dispatch(fetchTickets());               
            navigate('/Complaints');
        }
    },[isError,isSuccess])

    const formProduct = useRef();
    const formDescription = useRef();

    const complaintSubmit = (e) => {
        e.preventDefault();
        const formData = {
            product:formProduct.current.value,
            description:formDescription.current.value
        }
        dispatch(createTicket(formData));
    }

    if(isLoading)
    {
        return(
            <main className="page-layout">
                <div id="loading-container">
                    <img src={loadingSvg} className="loading-svg" alt="Page is loading..." />
                </div>
            </main>
        )
    }
    return(
        <main className="page-layout">
            <div className="new-complaint-form-flow">
                <form className="new-complaint-form">
                    <Link to='/complaints'>
                        <div className="ticket-header-create"  style={{margin:'none',position:'relative','right':'6px'}}>
                            <BsList className="complaint-list-link-logo"/>
                            To ticket list
                        </div>
                    </Link>
                    <div className="new-complaint-title">
                        Enter the complaint's details
                    </div>
                    <label htmlFor="product" className="new-complaint-label">
                        Product type
                    </label>
                    <input ref={formProduct} list="products" id='product' type="text"/>
                    <datalist id="products">
                        {productList.map((item)=><option key={item[0]} value={item} />)}
                    </datalist>
                    <label htmlFor="description" className="new-complaint-label">
                        Complaint description
                    </label>
                    <textarea ref={formDescription} id='description'/>
                    <div className="enter-new-complaint form-button" onClick={complaintSubmit}>
                        Submit complaint
                    </div>
                </form>
            </div>
        </main>
    )
}

export default NewComplaint