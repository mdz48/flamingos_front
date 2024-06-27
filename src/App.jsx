import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Section from './components/organisms/Section';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';

function App() {
  return (
    <Router>
      <Section />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
