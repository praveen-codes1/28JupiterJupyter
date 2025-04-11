import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Display from './pages/Display';
import ETADisplay from './components/ETADisplay';
import FormComponent from './components/FormComponent';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormComponent />} />
      <Route path="/display" element={<Display />} />
      <Route path="/eta" element={<ETADisplay />} />
    </Routes>
  );
}
