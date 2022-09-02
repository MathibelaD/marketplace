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
    const [lastFetchedListing, setlastFetchdListing,] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingRef = collection(db, 'listings')
                const q = query(listingRef,where('offer', '==' ,true), orderBy('timestamp','desc'),limit(6));

                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setlastFetchdListing(lastVisible)

                const listings = [];

                querySnap.forEach((doc) => {
                  
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

    const onFetchMoreListings = async () => {
        try {
          // Get reference
          const listingsRef = collection(db, 'listings')
    
          // Create a query
          const q = query(
            listingsRef,
            where('offer', '==' ,true),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(6)
          )
    
          // Execute query
          const querySnap = await getDocs(q)
    
          const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          setlastFetchdListing(lastVisible)
    
          const listings = []
    
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
    
          setListings((prevState) => [...prevState, ...listings])
          setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
      }
    

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
            <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
            </> ) 
            :( <p>No Offers</p>) }
        </div>
    )
}

export default Offers;