import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import InventarioMobiliario from './pages/InventarioMobiliario';
import InventarioInsumos from './pages/InventarioInsumos';

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path='/InventarioMobiliario' element={<InventarioMobiliario />}/>
              <Route path='/InventarioInsumos' element={<InventarioInsumos />}/>
            </Routes>
        </Router>
      );
    }
    
export default App;
/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;*/
