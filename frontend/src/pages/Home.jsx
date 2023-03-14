import { Link } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsList } from 'react-icons/bs'
import { useSelector } from 'react-redux'
function Home(){

    const {user} = useSelector(state => state.auth);

    if(user){
        return(
            <main className="page-layout">
                <div className="home-flow">
                    <div className="home-design">
                        <div className="home-title">
                            What do you need help with?
                        </div>
                        <div className="home-sub-title">
                            Please choose from an option below
                        </div>
                        <Link to='/complaints'>
                            <div className="view-complaint">
                                <BsList className='home-button-logo-view'/>
                                View my Complaints
                            </div>
                        </Link>
                        <Link to='/NewComplaint'>
                            <div className="create-complaint">
                                <AiOutlinePlusCircle className='home-button-logo-new'/>
                                Create new Complaint
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        )
    }
    else{
        return(
            <main className="page-layout">
                <h1 className='locked-home'>
                    Please log in to unlock support!
                </h1>
            </main>

        )
    }
}

export default Home