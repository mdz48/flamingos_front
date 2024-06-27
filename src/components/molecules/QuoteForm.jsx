import React, { useState } from 'react';
import Swal from 'sweetalert2';

function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    requiredDate: '',
    attendeesNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, companyName, phoneNumber, requiredDate, attendeesNumber } = formData;

    if (!fullName || !email || !companyName || !phoneNumber || !requiredDate || !attendeesNumber) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de enviar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: '¡Enviado!',
      text: 'Tu solicitud de cotización ha sido enviada con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    // Aquí puedes agregar lógica adicional para manejar el envío del formulario, como hacer una solicitud a un servidor.
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">CONTACTANOS PARA COTIZAR TÚ EVENTO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre completo</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de evento</label>
            <input
              type="text"
              name="companyName"
              placeholder="Tipo de evento"
              value={formData.companyName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Número de teléfono</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Número de teléfono"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Fecha requerida</label>
            <input
              type="date"
              name="requiredDate"
              placeholder="Fecha requerida"
              value={formData.requiredDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">¿Número de asistentes?</label>
            <input
              type="number"
              name="attendeesNumber"
              placeholder="¿Número de asistentes?"
              value={formData.attendeesNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-orange-700 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
          >
            COTIZAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuoteForm;
