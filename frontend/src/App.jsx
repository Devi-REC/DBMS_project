import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Continent from './Continent';
import Unemployment from './Unemployment';
import CountryStatistics from './CountryStatistics';
import EditCountryStatistics from './EditCountryStatistics';
import CreateCountryStatistics from './CreateCountryStatistics.';
import './App.css';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<Create />} />
        <Route path='/continent' element={<Continent />} />
        <Route path='/unemployment' element={<Unemployment />} />
        <Route path='/country-statistics' element={<CountryStatistics />} />
        <Route path='/country-statistics/create' element={<CreateCountryStatistics />} />
        <Route path='/country-statistics/edit/:id' element={<EditCountryStatistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
