import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';
import { data } from '../data/data';
import Navbar from '../components/organisms/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'info',
        title: 'Please',
        text: 'Fill out all fields!',
      });
    } else {
      // Your login logic here
      Swal.fire({
        title: 'Good!',
        text: 'Login successful!',
        icon: 'success',
      });
    }
  };

  return (
    <>
    <Navbar links={data.navhome} />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Iniciar Sesión</h2>
        <Field text="Email" type="email" placeholder="Enter your email" val={email} fnVal={setEmail} />
        <Field text="Password" type="password" placeholder="Enter your password" val={password} fnVal={setPassword} />
        <div className="flex justify-center mt-4">
          <Button onClick={handleLogin} text="Iniciar Sesión" />
        </div>
        <div className="text-center mt-4">
          <Link to="/recover-password" className="text-blue-500 hover:underline">Recuperar Contraseña</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
