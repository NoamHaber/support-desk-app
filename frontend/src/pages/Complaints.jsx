import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { fetchTickets,reset } from "../features/ticket/ticketSlice"
import loadingSvg from "../resources/loading.svg" 
import TicketItem from "../components/TicketItem"
import { toast } from "react-toastify"
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
function Complaints()
{    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading,isError,isSuccess,tickets,message} = useSelector(state => state.ticket);
    const {user} = useSelector(state => state.auth);

    const reloadTickets = (e) => {
        e.preventDefault();
        dispatch(fetchTickets());
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        else if(!tickets){
            dispatch(fetchTickets());
        }
    },[]);

    useEffect(()=>{

        if(isError)
        {
            toast.error(message);
        }

        if(isSuccess)
        {
            toast.success('Tickets are loaded!');
        }
        
        dispatch(reset());

    },[isSuccess,isError])
    

    if(isLoading){
        return(
            <>
            <main className="page-layout">
                <div id="loading-container">
                    <img src={loadingSvg} className="loading-svg" alt="Page is loading..." />
                </div>
            </main>
            </>
                
        )
    }
    else if(tickets)
    {
        if(tickets.length>0)
        {
            return(
                <>
                    <main className="page-layout" style={{overflowY:(tickets.length>3) ? 'scroll' :'unset'}}>
                    <div style={{marginBottom:(tickets.length>0) ?? '190vh'}}>
                        <div className="ticket-header">
                            <div className="ticket-header-text">
                                <GrPowerReset  className="reset-tickets-logo" onClick={reloadTickets}/>
                                Tickets
                            </div>
                            <Link to='/NewComplaint'>
                                <div className="ticket-header-create">
                                    <AiOutlinePlusCircle className="new-ticket-page-logo"/>
                                    Create new ticket
                                </div>
                            </Link>
                        </div>
                        {
                            <div>
                                {
                                tickets.map((item) => {
                                        return <TicketItem key={item._id} TicketInfo={item}/>
                                })
                                }
                            </div>
                        }
                    </div>                    
                </main>   
                </>
            )
        }
        else{
            return(
                <>
                    <main className="page-layout">
                    <h2>
                    No complaints to show yet...
                    </h2>
                    <div>
                        <AiOutlinePlusCircle className="new-ticket-page-logo"/>
                        Create new ticket
                    </div>
                </main>
                </>
                
            )
        }
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

export default Complaints