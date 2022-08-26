import { useState, useEffect} from "react";
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { async } from "@firebase/util";

const UserProfile = () => {
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(null);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const onSubmit = async () => {
        try {
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })

                const userRef = doc(db,'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name,
                })
            }
        } catch (error) {
            toast.error('Could not update profile details');
        }
    } 
    const onChange = () => {

    }

    const  {name, email} = formData;

    const navigate = useNavigate();
    const onLogout = () => {
        auth.signOut();
        navigate('/');
    }

    return(
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type='button' className="logOut" onClick={onLogout}>LogOut</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={() => {changeDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)}}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>

                <div className="profileCard">
                    <form>
                        <input type="text" id="name" className={!changeDetails ? 'ProfileName' : 'ProfileNameActive'}
                         disabled={!changeDetails} value={name} onChange={onChange}/>
                         <input type="email" id="email" className={!changeDetails ? 'ProfileEmail' : 'ProfileEmailActive'}
                         disabled={!changeDetails} value={email} onChange={onChange}/>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default UserProfile;