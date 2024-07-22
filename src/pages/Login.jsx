import React, { useRef } from 'react';
import Navbar from '../components/organisms/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Button from '../components/atoms/Button';
import { data } from '../data/data';

function Login() {
  const user_idRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user))
      Swal.fire({
        title: '¡Excelente!',
        text: '¡Inicio de sesión exitoso!',
        icon: 'success',
      });
      navigate('/home-empleados');
    },
    onError: (error) => {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Inicio de sesión fallido!',
      });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const user_id = user_idRef.current.value;
    const password = passwordRef.current.value;

    if (!user_id.trim() || !password.trim()) {
      Swal.fire({
        icon: 'info',
        title: 'Por favor',
        text: '¡Rellena todos los campos!',
      });
      return;
    }

    const loginData = { user_id, password };
    mutation.mutate(loginData);
  };

  return (
    <>
    <Navbar links={data.navhome} img = {'/'}/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Iniciar Sesión</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
              Identificación
            </label>
            <input
              ref={user_idRef}
              type="text"
              id="user_id"
              placeholder="Ingresa tu ID"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={handleLogin}  text="Iniciar Sesión" />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
