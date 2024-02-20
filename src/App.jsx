import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import "./App.css";


function App() {
  return (
    <div className="App">
      <Navbar />
      
        <Routes>
          <Route path="/" element={HomePage} />
          <Route path="/CountryDetailsPage" element={CountryDetailsPage} />
        </Routes>
      
    </div>
  );
}

export default App;

