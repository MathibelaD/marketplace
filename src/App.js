import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import Explore from './pages/explore';
import Offers from './pages/Offers';
import signIn from './pages/signIn';
import signUp from './pages/signUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/> 
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/sign-In' element={<signIn/>}/>
          <Route path='/sign-Up' element={<signUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
        < NavBar />
      </Router>
    </>
  );
}

export default App;
