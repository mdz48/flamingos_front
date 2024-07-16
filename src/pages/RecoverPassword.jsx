import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';

function RecoverPassword() {
  const [email, setEmail] = useState('');

  const handleRecover = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire({
        icon: 'info',
        title: 'Please',
        text: 'Fill out the email field!',
      });
    } else {
      // Your password recovery logic here
      Swal.fire({
        title: 'Good!',
        text: 'Recovery email sent!',
        icon: 'success',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Recuperar Contraseña</h2>
        <Field text="Email" type="email" placeholder="Enter your email" val={email} fnVal={setEmail} />
        <div className="flex justify-center mt-4">
          <Button onClick={handleRecover} text="Send Recovery Email" />
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
