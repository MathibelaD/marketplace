import {useState, useEffect} from 'react';
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import { addDoc,collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config'; 
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Spinner } from '../components/Spinner';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { async } from '@firebase/util';

function CreateListings (){
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking:false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice:0,
        discountedPrice:0,
        images: {},
        latitude: 0,
        longitude:0

    })

    const {type,name,bedrooms,bathrooms,parking,furnished,address,offer,regularPrice,discountedPrice,images,latitude,longitude} = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setFormData({...formData,useRef: user.uid})
                }else{
                    navigate('/profile')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    },[isMounted])

   

  //===========================================SUBMIT FUNCTION===============================================
    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
       
        if(discountedPrice >= regularPrice){
            setLoading(false)
            toast.error('discount price cant be more than regular price')
        }

        if(images.length > 6){
            setLoading(false)
            toast.error('Max 6 images')
        }

        let geolocation = {}
        let location
    
       
        geolocation.lat = latitude
        geolocation.lng = longitude
        location = address

        //Store images
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                console.log('welcome')
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage,'image/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef,image)

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done');
                        
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL)
                            }
                        )
                    }
                )
            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image)),
        ).catch ((error) => {
            setLoading(false)
            console.log(error)
            toast.error('Images not uploaded')
            return
        })
      
        //========add documents to database
        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp()
        }

        delete formDataCopy.images
        delete formDataCopy.address
        location && (formDataCopy.location = location)
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db,'listings'),formDataCopy)
        setLoading(false)
        toast.success('Listing saved')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)

    }

    //==========================================================OnMutate==============================================
    const onMutate = (e) => {
        let boolen = null

        if(e.target.value === 'true'){
            boolen = true
        }
        if(e.target.value === 'false'){
            boolen = false
        }

        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files
            }))
        }

        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolen ?? e.target.value,
            }))
        }

    }

    if(loading)
    {
        return <Spinner />
    }

    return(
       <div className="profile">
        <header>
            <p className="pageHeader">Create a Listing</p>
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <label className="formLabel">Sell / Rent</label>
                <div className="formButtons">
                <button type='button'
                className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                id='type'
                value='sale'
                onClick={onMutate}>
                    Sell
                </button>
                <button type='button'
                className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                id='type'
                value='rent'
                onClick={onMutate}>
                    Rent
                </button>
                </div>
                <label className="formLabel">Name</label>
                <input type="text"
                 className="formInputName"
                 id='name'
                 value={name}
                 onChange={onMutate}
                 maxLength='32'
                 minLength='10'
                 required />
            
            <div className="formRooms flex">
                <div>
                    <label className="formLabel">Bedrooms</label>
                    <input 
                    type="number" 
                    className="formInputSmall"
                    id='bedrooms'
                    value={bedrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>
                <div>
                    <label className="formLabel">Bathrooms</label>
                    <input 
                    type="number" 
                    className="formInputSmall"
                    id='bathrooms'
                    value={bathrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>
            </div>
            <label className='formLabel'>Parking spot</label>
            <div className="formButtons">
                <button 
                className={parking ? 'formButtonActive' : 'formButton'}
                type='button'
                id='parking'
                value={true}
                onClick={onMutate}
                min='1'
                max='50'>
                    Yes
                </button>
                <button 
                className={
                    !parking && parking !== null ? 'formButtonActive' : 'formButton'
                }
                type='button'
                id='parking'
                value={false}
                onClick={onMutate}>
                    No
                </button>
            </div>
            <label className="formLabel">Furnished</label>
            <div className="formButtons">
            <button 
                className={furnished ? 'formButtonActive' : 'formButton'}
                type='button'
                id='furnished'
                value={true}
                onClick={onMutate}>
                    Yes
                </button>
            <button 
                className={
                    !furnished && furnished !== null ? 'formButtonActive' : 'formButton'}
                type='button'
                id='furnished'
                value={false}
                onClick={onMutate}>
                    No
                </button>
            </div>
        <label className="formLabel">Address</label>
        <textarea className="formInputAddress" 
        type='text'
        id='address'
        value={address}
        onChange={onMutate}
        required />

        {!geoLocationEnabled && (
            <div className="formLatLng flex">
                <div>
                    <label className="formLabel">Latitude</label>
                    <input type="number" className="formInputSmall"
                    id='latitude'
                    value={latitude}
                    onChange={onMutate}
                    required />
                </div>
                <div>
                    <label className="formLabel">Longitude</label>
                    <input type="number" className="formInputSmall"
                    id='longitude'
                    value={longitude}
                    onChange={onMutate}
                    required />
                </div>
            </div>
        )}
        <label className="formLabel">Offers</label>
        <div className="formButtons">
            <button 
            className={
                offer ? 'formButtonActive' : 'formButton'
            }
            type='button'
            id='offer'
            value={true}
            onClick={onMutate}>
                Yes
            </button>
         <button 
            className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
            }
            type='button'
            id='offer'
            value={false}
            onClick={onMutate}>
                No
        </button>
        </div>
        {/*================================================================================ */}
        <label className="formLabel">Regular Price</label>
        <div className="formPriceDiv">
            <input type="number" className="formInputSmall"
            id='regularPrice'
            value={regularPrice}
            onChange={onMutate}
            min='50'
            max='7500000000'
            required />
            {type === 'rent' && (
                <p className="formPriceText">R / Month</p>
            )}
        </div>
        {offer && (
            <>
            <label className="formLabel">Discounted Price</label>
            <input type="number" className="formInputSmall"
            id='discountedPrice'
            value={discountedPrice}
            onChange={onMutate}
            min='50'
            max='750000000'
            required={offer} />
            </>
        )}
        <label className="formLabel">Images</label>
        <p className="imagesInfo">The first image will be the cover (max 6).</p>
        <input type="file" className="formInputFile"
        id='images'
        onChange={onMutate}
        max='6'
        accept='.jpg,.png,.jpeg'
        multiple
        required />
        <button type='submit' className="primaryButton createListingButton">Create Listing</button>
        </form>
        </main>
       </div>
    )
}

export default CreateListings;