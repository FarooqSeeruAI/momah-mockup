import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/Dashboard';

import PolicyLevers from './pages/PolicyLevers';
import IndicatorImpacts from './pages/IndicatorImpacts';
import Affordability from './pages/Affordability';
import PriceImpacts from './pages/PriceImpacts';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/policies" element={<PolicyLevers />} />
          <Route path="/impacts" element={<IndicatorImpacts />} />
          <Route path="/affordability" element={<Affordability />} />
          <Route path="/prices" element={<PriceImpacts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
