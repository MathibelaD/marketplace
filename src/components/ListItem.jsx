import { Link } from "react-router-dom";
import {ReactComponent as deleteIcon} from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg'


function ListItem ({listing, id, onDelete}) {

    return(
        <li className="categoryListing">
            <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
                <img src={listing.imgUrls[0]} alt={listing.name} className="categoryListingImg" />
            
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">
                    {listing.location}
                </p>
                <p className="categoryListingName">
                    {listing.name}
                </p>
                <p className="categoryListingPrice">
                    R{listing.offer ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    {listing.type === 'rent' && ' / Month'}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={bedIcon} alt='bed' />
                    <p className="categoryListingInfoText">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
                    </p>
                    <img src={bathtubIcon} alt='bathtub icon' />
                    <p className="categoryListingInfoText">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathrooms`}
                    </p>
                </div>
            </div>
            {onDelete && <deleteIcon className='removeIcon' onClick={() => onDelete(listing.id, listing.name)}/>}
            </Link>
        </li>
    )
}

export default ListItem;