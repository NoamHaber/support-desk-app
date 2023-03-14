import { useEffect } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logOut } from '../features/auth/authSlice'
import { logOutTickets } from '../features/ticket/ticketSlice'
import { logOutNotes } from '../features/notes/noteSlice'
import { toast } from 'react-toastify'


function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const logUserOut = (e) =>{
        e.preventDefault();
        dispatch(logOut());
        dispatch(logOutTickets());
        dispatch(logOutNotes());
        toast.success('User logged out successfully');
        navigate('/');    
    }

    useEffect(()=>{
        if(!user && localStorage.getItem('SessionWebToken')){
            localStorage.removeItem('SessionWebToken');
        }
    },[]);

    useEffect(()=>{
        if(!localStorage.getItem('SessionWebToken')){
            dispatch(logOut());
            dispatch(logOutTickets());
        }
    },[localStorage.getItem('SessionWebToken')]);

    return(
        <header className="header-flow">
            <nav className="header-layout">
                <Link to="/">
                    <div className="nav-item nav-logo">
                        <BiSupport id='support-logo'/>
                        Support Desk
                    </div>
                </Link>
                {
                (!user)
                ?(
                    <div className="nav-actions">
                    <Link to='/login'>
                        <div className="nav-item">
                            <FaSignInAlt id='log-logo' />
                            Login
                        </div>
                    </Link>
                    <Link to='/register'>
                        <div className="nav-item">
                            <FaUser  id='register-logo'/>
                            Register                        
                        </div>
                    </Link>
                    </div>
                )
                :(
                    <div className="nav-actions">
                        <div className="nav-item" style={{color:'#4B99AD'}}>
                            {user.name}
                        </div>
                        <div className="nav-item" onClick={logUserOut}>
                            <FaUser  id='register-logo'/>
                            Log out                        
                        </div>
                    </div>
                )
            }
            </nav>
        </header>
    )
}

export default Header