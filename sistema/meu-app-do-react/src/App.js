import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Relatorio from './pages/Relatorio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Relatorio" element={<Relatorio />} />
      </Routes>
    </Router>
  );
}

export default App;
