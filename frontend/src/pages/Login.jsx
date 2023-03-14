import { useRef,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import loadingSvg from "../resources/loading.svg" 
import { useSelector,useDispatch } from "react-redux";
import { login,reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify'
function Login(){

    const emailInput = useRef('');
    const passwordInput = useRef('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {user, isLoading, isError, isSucccess, message} = useSelector(state => state.auth);

    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        // Redirect when logged in
        if(isSucccess || user){
            toast.success('User successfully logged in!')
            navigate('/');
        }

        dispatch(reset());

    },[isError,isSucccess,user,message])

    const loginSubmit = (e) => {
        e.preventDefault();
        const FormData = {
            email:emailInput.current.value,
            password:passwordInput.current.value
        }
        dispatch(login(FormData));
        emailInput.current.value='';
        passwordInput.current.value='';
    }

    if(isLoading){
        return(
            <main className="page-layout">
                <div id="loading-container">
                    <img src={loadingSvg} className="loading-svg" alt="Page is loading..." />
                </div>
            </main>
        )
    }
    else{    
        return(
            <main className="page-layout">
                <div className="form-flow">
                        <form className="form-design">
                            <div className="form-title">
                                Login
                                <FaSignInAlt className="register-form-logo"/>
                            </div>
                            <div className="form-sub-title">
                                Please enter your credentials
                            </div>
                            <input ref={emailInput} type="email" className="login-register-input" placeholder="Email" required/>
                            <input ref={passwordInput} type="password" className="login-register-input" placeholder="Password" required/>
                            <div className="login-register-submit form-button" onClick={loginSubmit}>
                                Submit
                            </div>
                        </form>  
                </div>
            </main>
        )
    }
}

export default Login