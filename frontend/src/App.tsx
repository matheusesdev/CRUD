// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Import Login page
import Portal from './pages/Portal'; // Import Portal page
import Loja from './pages/Loja'; // Import Loja page
import './App.css';

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/loja" element={<Loja />} />
      </Routes>
    </Router>
  );
}

export default App;
