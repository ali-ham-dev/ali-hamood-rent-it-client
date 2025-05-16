import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderPublic from './components/HeaderPublic/HeaderPublic';
import HomePublic from './pages/HomePublic/HomePublic';

function App() {

  return (
    <BrowserRouter>
      <HeaderPublic /> 
      <Routes>
        <Route path='/' element={<HomePublic />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
