import './App.css';
import React, { lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Payment from './Pages/Payment/Payment';
import Result from './Pages/Result/Result';
import SamsungPayment from './Pages/SamsungPayment/SamsungPayment';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Payment />}/>
          <Route exact path="/samsung-payment" element={<SamsungPayment />}/>
          <Route exact path="/result" element={<Result />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
