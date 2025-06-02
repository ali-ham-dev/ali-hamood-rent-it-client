import './App.scss';
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePublic from './pages/HomePublic/HomePublic';
import AssetPage from './pages/AssetPage/AssetPage';
import SignUp from './pages/SignUp/SignUp';
import UserAuth from './pages/UserAuth/UserAuth';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';

function App() {

  const isLoggedIn = useRef(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      console.log('Checking auth status');
      const jwtCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='));

      console.log(jwtCookie);
      
      // Get user data from cookie
      const userCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='));

      if (!jwtCookie || !userCookie) {
        isLoggedIn.current = false;
        return;
      }

      try {
        // Extract token and user data
        const token = jwtCookie.split('=')[1];
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));

        // Basic validation of user data
        if (!userData || !userData.id || !userData.email) {
          isLoggedIn.current = false;
          return;
        }

        // TODO: Add JWT validation here
        // This would require:
        // 1. Decoding the JWT
        // 2. Checking expiration
        // 3. Verifying signature with public key
        // For now, we'll just check if token exists
        if (token) {
          isLoggedIn.current = true;
        } else {
          isLoggedIn.current = false;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        isLoggedIn.current = false;
      }
    };

    checkAuthStatus();
    console.log(isLoggedIn.current);
  }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
        <Route path='/asset/:assetId' element={<AssetPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-auth/:userId/:email/:expires' element={<UserAuth isLoggedIn={isLoggedIn} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
