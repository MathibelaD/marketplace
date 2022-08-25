import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password} = formData;
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
                        Register Account
                    </p>
                </header>
                <main>
                    <form>
                    <input type="text" className="nameInput" id="name" placeholder="User Name" value={name} onChange={onChange}/>
                        <input type="email" className="emailInput" id="email" placeholder="Email" value={email} onChange={onChange}/>
                        <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" id="password" placeholder="Password" value={password} onChange={onChange}/>
                        <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
                        </div>

                        <Link to='/forgot-password'className="forgotPasswordLink">Forgot Password</Link>

                        <div className="signUpBar">
                            <p className="signUpText">Sign Up</p>
                            <button className="signUpButton"><ArrowIcon fill='#ffffff' /></button>
                        </div>

                        {/* google */}

                        <Link to="/profile" className="registerLink">sign In instead</Link>
                        </form>
                </main>
            </div>
        </>
       
    )
    
}

export default Register;