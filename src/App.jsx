import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Section from './components/organisms/Section';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Section />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
