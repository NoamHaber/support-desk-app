import { useNavigate } from "react-router-dom";
import { useRef,useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import loadingSvg from "../resources/loading.svg" 
import {toast} from "react-toastify"
import { useSelector,useDispatch } from "react-redux";
import { register,reset } from "../features/auth/authSlice";


function Register(){

    const navigate = useNavigate()

    const nameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');

    const dispatch = useDispatch();

    const {user, isLoading, isError, isSucccess, message} = useSelector(state => state.auth);

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        // Redirect when logged in
        if(isSucccess || user){
            toast.success('User successfully registered!')
            navigate('/');
        }

        dispatch(reset());
    },[isError,isSucccess,user,message])

    const registerSubmit = (e) => {
        e.preventDefault();
        const FormData = {
            name:nameInput.current.value,
            email:emailInput.current.value,
           password:passwordInput.current.value
        }
        dispatch(register(FormData));
        nameInput.current.value='';
        emailInput.current.value='';
        passwordInput.current.value='';
    }

    if(isLoading)
    {
        <main className="page-layout">
            <div id="loading-container">
                <img src={loadingSvg} className="loading-svg" alt="Page is loading..." />
            </div>
        </main>
    }

    else
    {
        return(
            <main className="page-layout">
                <div className="form-flow">
                        <form className="form-design">
                            <div className="form-title">
                                Register
                                <FaUser className="register-form-logo"/>
                            </div>
                            <div className="form-sub-title">
                                Please create an acount
                            </div>
                            <input ref={nameInput} type="text" className="login-register-input" placeholder="Full name" required/>
                            <input ref={emailInput} type="email" className="login-register-input" placeholder="Email" required/>
                            <input ref={passwordInput} type="password" className="login-register-input" placeholder="Password" required/>
                            <div className="login-register-submit form-button" onClick={registerSubmit}>
                                Submit
                            </div>
                        </form>  
                </div>
            </main>
        )
    }

}

export default Register