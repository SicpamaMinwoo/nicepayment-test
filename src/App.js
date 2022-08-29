import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Payment, Result } from './Pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Payment />}/>
        <Route exact path="/result" element={<Result />}/>
      </Routes>
    </Router>
  );
};

export default App;
