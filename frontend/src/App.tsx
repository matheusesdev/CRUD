// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import Portal from './pages/Portal'; 
import Products from './pages/Products'; 
import Loja from './pages/Loja'; 
import './App.css';
import Stocks from './pages/Stocks';

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </Router>
  );
}

export default App;
