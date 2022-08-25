import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import Explore from './pages/explore';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Register from './pages/register';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/> 
          <Route path='/profile' element={<Profile />}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/register' element={<Register />} />
        </Routes>
        < NavBar />
      </Router>
    </>
  );
}

export default App;
