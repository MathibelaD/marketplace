import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import NavBar from './components/NavBar';
import Category from './pages/Category';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/explore';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import CreateListings from './pages/CreateListings';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfiles';
import Register from './pages/register';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/category/:categoryName' element={<Category />}/> 
          <Route path='/userProfile' element={<PrivateRoute />} >
            <Route path='/userProfile' element={<UserProfile />} />
           </Route>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/create-listing' element={<CreateListings />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        < NavBar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
