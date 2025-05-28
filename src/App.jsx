import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderPublic from './components/HeaderPublic/HeaderPublic';
import HomePublic from './pages/HomePublic/HomePublic';
import AssetPage from './pages/AssetPage/AssetPage';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <HeaderPublic /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
        <Route path='/asset/:assetId' element={<AssetPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
