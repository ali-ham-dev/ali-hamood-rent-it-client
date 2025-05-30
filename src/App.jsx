import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePublic from './pages/HomePublic/HomePublic';
import AssetPage from './pages/AssetPage/AssetPage';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
        <Route path='/asset/:assetId' element={<AssetPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
