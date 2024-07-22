// src/pages/Cotizacion.jsx
import React, { useState } from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/molecules/Footer';
import { data } from '../data/data';
import Button from '../components/atoms/Button';

function Cotizacion() {
  const [salon, setSalon] = useState('');
  const [paquete, setPaquete] = useState('');
  const [personas, setPersonas] = useState('');
  const [costoTotal, setCostoTotal] = useState(null);

  const calcularCosto = () => {
    const precioSalon = data.preciosSalones[salon] || 0;
    const precioPaquete = data.preciosPaquetes[paquete] || 0;
    const total = (precioPaquete * personas) + precioSalon;
    setCostoTotal(total);
  };

  return (
    <>
      <Navbar links={data.navhome} img = {'/'}/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Cotización</h1>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="salon">Salón</label>
            <select id="salon" value={salon} onChange={(e) => setSalon(e.target.value)} className="border p-2 rounded">
              <option value="">Seleccione un salón</option>
              <option value="flamingos">Flamingos</option>
              <option value="chulaVista">Chula Vista</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="paquete">Paquete</label>
            <select id="paquete" value={paquete} onChange={(e) => setPaquete(e.target.value)} className="border p-2 rounded">
              <option value="">Seleccione un paquete</option>
              <option value="flamingos">Flamingos - $259/persona</option>
              <option value="premium">Premium - $369/persona</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="personas">Cantidad de personas</label>
            <input id="personas" type="number" value={personas} onChange={(e) => setPersonas(e.target.value)} className="border p-2 rounded" />
          </div>
          <Button onClick={calcularCosto} text="Cotizar" className="self-start" />
        </form>
        {costoTotal !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <p className="font-bold">Costo Total: ${costoTotal}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cotizacion;
