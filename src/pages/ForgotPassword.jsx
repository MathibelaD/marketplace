import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {toast} from 'react-toastify';
import {ReactComponent as ArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import { async } from "@firebase/util";

function ForgotPassword() {

    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email Sent');
        } catch (error) {
            toast.error('Could not send reset email');
        }
    }

    return(
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Reset Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
               
                <Link className="forgotPasswordLink" to='/profile'>Sign in
                </Link>

                <div className="signInBar">
                    <div className="signInText">Send Reset Link</div>
                    <button className="signInButton">
                        <ArrowIcon fill='#ffffff' />
                    </button>
                </div>
                </form>
            </main>
        </div>
    )
    
}

export default ForgotPassword;