import { useEffect } from "react"
import { Link } from 'react-router-dom'

function TicketItem({TicketInfo})
{


    return(
        <div className="ticket-item-container">
            <div className="ticket-item-holder">
                <Link to={`/TicketPage/${TicketInfo._id}`}>
                    <div>
                            <div className="ticket-item-header">
                                <b>Product</b> : {TicketInfo.product}
                            </div>
                            <div className="ticket-item-description">
                                <b>Description</b> : {TicketInfo.description}
                            </div>
                            <div>
                                <b>Created at</b> : {`${TicketInfo.createdAt.split('T')[0]} ${TicketInfo.createdAt.split('T')[1].slice(0,8)}`}
                            </div>
                            <div className="ticket-item-description">
                                <b>Status </b> : {TicketInfo.status.toUpperCase()}
                            </div>    
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TicketItem