import React from 'react';
import './App.scss';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import HomePage from './pages/HomePage';
import PromotionsPage from './pages/PromotionsPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/promotions' element={<PromotionsPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
