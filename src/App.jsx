import './App.scss';
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePublic from './pages/HomePublic/HomePublic';
import AssetPage from './pages/AssetPage/AssetPage';
import SignUp from './pages/SignUp/SignUp';
import Footer from './components/Footer/Footer';

function App() {

  const isLoggedIn = useRef(false);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
        <Route path='/asset/:assetId' element={<AssetPage />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
