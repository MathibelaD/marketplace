import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function Profile() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    return(
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome back
                    </p>
                </header>
                <main>
                    <form>
                        <input type="email" className="emailInput" id="email" placeholder="Email" value={email} onChange={onChange}/>
                        <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" id="password" placeholder="Password" value={password} onChange={onChange}/>
                        <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
                        </div>

                        <Link to='/forgot-password'className="forgotPasswordLink">Forgot Password</Link>

                        <div className="signInBar">
                            <p className="signInText">Sign in</p>
                            <button className="signInButton"><ArrowIcon fill='#ffffff' width='34px' height='34px' /></button>
                        </div>

                        {/* google */}

                        <Link to="/register" className="registerLink">sign Up instead</Link>
                        </form>
                </main>
            </div>
        </>
       
    )
    
}

export default Profile;