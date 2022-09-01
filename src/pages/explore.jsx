import {Link} from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';


function Explore() {

    return(
        <div className='explore'>
            <header>
                <p className="pageHeader">Explore</p>
            </header>
            <main>
                <p className="exploreCategoryheading">Categories</p>
                <div className="exploreCategories">
                    <Link to='/category/rent'>
                        <img src={rentCategoryImage} alt="RentImage" className='exploreCategoryImg' />
                        <p className="exploreCategoryName">Places for rent</p>
                    </Link>
                    <Link to='/category/sale'>
                        <img src={sellCategoryImage} alt="CategoryImage" className='exploreCategoryImg' />
                        <p className="exploreCategoryName">Places for sale</p>
                    </Link>
                </div>
            </main>
        </div> 
    )
    
}

export default Explore;