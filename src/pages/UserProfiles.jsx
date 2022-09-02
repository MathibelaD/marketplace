import { useState, useEffect} from "react";
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc, collection, getDocs, query,where,orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import ListItem from '../components/ListItem'
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import home from '../assets/svg/homeIcon.svg';
import { async } from "@firebase/util";

const UserProfile = () => {
    const auth = getAuth();
    const [loading,setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [changeDetails, setChangeDetails] = useState(false);
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

    const onDelete = async (listingId) => 
    {
        if(window.confirm('Are you sure you want to delete?')){
            await deleteDoc(doc(db, 'listings', listingId))
            const updateListings = listings.filter((listing) => 
            listing.id !== listingId)
            setListings(updateListings)
            toast.success('Successfully deleted listing')
        }
    }

    const onEdit = (listingId) => {
        navigate(`/edit-listing/${listingId}`)
    }

    const  {name, email} = formData;

    const navigate = useNavigate(); 

    useEffect(() => {
        try {
            const fetchUserListings = async () => {
                const listingsRef = collection(db, 'listings')
        //   console.log(listingsRef);
                const q = query(
                  listingsRef,
                  where('useRef', '==', auth.currentUser.uid),
                  orderBy('timestamp', 'desc')
                )
                // console.log(()=>getDocs(listingsRef));
          
                const querySnap = await getDocs(q)
                // const querySna = await getDocs(listingsRef)
        //   console.log(querySna.docs);
                let listings = []
                // console.log(auth.currentUser.uid)
                querySnap.forEach((doc) => {
                  return listings.push({
                    id: doc.id,
                    data: doc.data()
                  })
                })
          
                setListings(listings)
                setLoading(false)
              }
          
              fetchUserListings()
           
        } catch (error) {
            console.log(error)
        }
    }, [auth.currentUser.uid])

    //console.log(listings)
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

                <div className='profileCard'>
                        <form>
                            <input
                            type='text'
                            id='name'
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                            />
                            <input
                            type='text'
                            id='email'
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                            />
                        </form>
        </div>
                <Link to='/create-listing' className="createListing">
                        <img src={home} alt="homeIcon" />
                        <p>Sell or Rent your home</p>
                        <img src={ArrowRight} alt="ArrowIcon" />
                </Link>


         {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
            </main>
        </div>
    )
}

export default UserProfile;