import './App.css';
import React, { lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Payment from './Pages/Payment/Payment';
import Result from './Pages/Result/Result';
import SamsungPayment from './Pages/SamsungPayment/SamsungPayment';
import WebPayment from './Pages/KICCPayment/WebPayment';
import BatchPayment from './Pages/KICCPayment/BatchPayment';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Payment />}/>
          <Route exact path="/samsung-payment" element={<SamsungPayment />}/>
          <Route exact path="/result" element={<Result />}/>
          <Route exact path="/kicc-webpay" element={<WebPayment />}/>
          <Route exact path="/kicc-batch" element={<BatchPayment />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
