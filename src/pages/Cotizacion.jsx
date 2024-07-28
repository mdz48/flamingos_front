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
    <div className="flex flex-col min-h-screen">
      <Navbar links={data.navhome} img='/' />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md w-full md:max-w-6xl max-w-4xl">
          <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center">
            <img src="log-in.jpg" alt="Descripción de la imagen" className="rounded-lg w-3/4 h-auto md:w-full" />
          </div>
          <div className="md:w-1/2 w-full pl-0 md:pl-8 flex flex-col justify-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Cotización</h2>
            <form className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="salon" className="block text-gray-700 text-sm font-bold mb-2">Salón</label>
                <select id="salon" value={salon} onChange={(e) => setSalon(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Seleccione un salón</option>
                  <option value="flamingos">Flamingos</option>
                  <option value="chulaVista">Chula Vista</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="paquete" className="block text-gray-700 text-sm font-bold mb-2">Paquete</label>
                <select id="paquete" value={paquete} onChange={(e) => setPaquete(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Seleccione un paquete</option>
                  <option value="flamingos">Flamingos - $259/persona</option>
                  <option value="premium">Premium - $369/persona</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="personas" className="block text-gray-700 text-sm font-bold mb-2">Cantidad de personas</label>
                <input id="personas" type="number" value={personas} onChange={(e) => setPersonas(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={calcularCosto} text="Cotizar" className="bg-orange-500 text-white px-4 py-2 rounded" />
              </div>
            </form>
            {costoTotal !== 0 &&  (
              <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                <p className="font-bold">Costo Total: ${costoTotal}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cotizacion;
