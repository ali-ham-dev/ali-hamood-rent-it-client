import './App.scss';
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import HomePublic from './pages/HomePublic/HomePublic';
import AssetPage from './pages/AssetPage/AssetPage';
import SignUp from './pages/SignUp/SignUp';
import UserAuth from './pages/UserAuth/UserAuth';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';

const apiUrl = import.meta.env.VITE_API_URL;
const checkJwtEp = import.meta.env.VITE_CHECK_JWT_EP;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);

  const clearUserData = () => {
    isLoggedIn && setIsLoggedIn(false);
    userData && setUserData(null);
    jwt && setJwt(null);
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      const jwtCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='));

      const userCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='));

      if (!jwtCookie || !userCookie) {
        clearUserData();
        return;
      }

      try {
        const userData = JSON.parse(userCookie.split('=')[1]);
        if (!userData) { 
          clearUserData();
          console.log('userData is false');
          return;
        }

        const requiredFields = ['id', 'email', 'firstName', 'lastName', 'phone'];
        const hasAllFields = requiredFields.every(field => {
            const value = userData[field];
            return value !== undefined && value !== null && value !== '';
        });
        if (!hasAllFields) {
            clearUserData();
            console.log('userData is missing or corrupted');
            return;
        }

        const jwt = jwtCookie.split('=')[1];
        if (!jwt) {
          clearUserData();
          console.log('jwt is false');
          return;
        }

        const response = await axios.post(`${apiUrl}${checkJwtEp}`, {}, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        if (response && 
            response.data && 
            response.data.valid && 
            response.data.user && 
            response.data.user.id && 
            response.data.user.email &&
            response.data.user.id === userData.id &&
            response.data.user.email === userData.email) {
          !(isLoggedIn) && setIsLoggedIn(true);
          setUserData(userData);
          setJwt(jwt);
          console.log('Login successful.');
          return;
        }
        clearUserData();
        console.log('Login failed.');
      } catch (error) {
        console.error('Error checking auth status:', error);
        clearUserData();
      }
    };
    checkAuthStatus();
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userData={userData} /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
        <Route path='/asset/:assetId' element={<AssetPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-auth/:userId/:email/:expires' element={<UserAuth setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
