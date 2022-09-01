import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {collection, getDocs, query, where, orderBy,limit,startAfter} from 'firebase/firestore';
import {db} from '../firebase.config';
import {toast} from 'react-toastify';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
import { async } from '@firebase/util';

function Offers () {

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingRef = collection(db, 'listings')
                const q = query(listingRef,where('offer', '==' ,true), orderBy('timestamp','desc'),limit(10));

                const querySnap = await getDocs(q);

                const listings = [];

                querySnap.forEach((doc) => {
                    //console.log(doc.data());
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    
                })
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('could not fetch listings');
            }
        }
        fetchListings();
    }, [])


    return(
        <div className='category'>
            <header>
            <p className="pageHeader">
                Offers
            </p>
            </header>
            {loading ? (<Spinner />) :  listings && listings.length > 0 ?( <>
            <main>
                <ul className="categoryListings">
                    {listings.map((listing) => (
                       <ListItem listing={listing.data} id={listing.id} key={listing.id}/>
                    ))}
                </ul>
            </main>
            </> ) 
            :( <p>No Offers</p>) }
        </div>
    )
}

export default Offers;