import React, { useState } from 'react';
import ComboboxSalon from '../../../molecules/ComboboxSalon';
import CheckboxPackage from '../../../molecules/CheckboxPackage';
import Button from '../../../atoms/Button';
import FormClient from '../client/FormClient';
import ComboboxClient from '../../../molecules/ComboboxClient';

const FormularioSalon = () => {
    const [cliente, setCliente] = useState('');
    const [cantidadInvitados, setCantidadInvitados] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
  
    const handleClienteExistenteClick = () => {
      setCliente('clienteExistente');
    };
  
    const handleNuevoClienteClick = () => {
      setCliente('nuevoCliente');
    };
  
    const handlePaqueteChange = (selectedValue) => {
      setPaquete(selectedValue);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para manejar el envío del formulario
    };
  
    return (
      <form className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
       
  
        <ComboboxSalon />
  
        <div className="mt-4 flex space-x-4">
          <Button
            text="Cliente Existente"
            className={cliente === 'clienteExistente' ? 'bg-orange-500' : ''}
            onClick={handleClienteExistenteClick}
          />
          <Button
            text="Nuevo Cliente"
            className={cliente === 'nuevoCliente' ? 'bg-orange-500' : ''}
            onClick={handleNuevoClienteClick}
          />
        </div>
  
        {cliente === 'nuevoCliente' && (
          <div className="mt-4">
            <FormClient onClose={() => setCliente('')} />
          </div>
        )}
  
        {cliente === 'clienteExistente' && (
          <div className="mt-4">
            <ComboboxClient />
          </div>
        )}
  
        <div className="mt-4">
          <CheckboxPackage onChange={handlePaqueteChange} />
        </div>
  
        <div className="mt-4">
          <label className="block text-gray-700">Cantidad de Invitados:</label>
          <input
            type="number"
            value={cantidadInvitados}
            onChange={(e) => setCantidadInvitados(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
  
        <div className="mt-4">
          <label className="block text-gray-700">Tipo de Evento:</label>
          <input
            type="text"
            value={tipoEvento}
            onChange={(e) => setTipoEvento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
  
        <div className="mt-4">
          <label className="block text-gray-700">Fecha del Evento:</label>
          <input
            type="date"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
  
        <div className="mt-6">
          <Button text="Guardar" className="w-full" />
        </div>
      </form>
    );
  };
  
  export default FormularioSalon;
