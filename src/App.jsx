import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import Mobiliario from './pages/Mobiliario';
import Insumos from './pages/Insumos';
import Client from './pages/Client';
import RentedMobiliary from './pages/RentedMobiliary';
import Salon from './pages/Salon';
import Users from './pages/Users';
import Cotizacion from './pages/Cotizacion';
import HomeEmpleados from './pages/HomeEmpleados';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Rented from './pages/Rented';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/home-empleados" element={<HomeEmpleados />} />
          <Route path="/mobiliario" element={<Mobiliario />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/client" element={<Client />} />
          <Route path="/rentedmobiliary" element={<RentedMobiliary />} />
          <Route path="/salon" element={<Salon />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rented" element={<Rented/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;