import React, { useRef, useContext } from 'react';
import Navbar from '../components/organisms/Navbar';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Button from '../components/atoms/Button';
import { data } from '../data/data';
import { UserContext } from '../context/userContext';

function Login() {
  const mailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const value = useContext(UserContext);

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
      localStorage.setItem('user', JSON.stringify(data.user));
      value.setUser(data.user);
      navigate('/home-empleados');
    },
    onError: (error) => {
      console.error('Error during login:', error);
      toast.error('Credenciales Incorrectas');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const mail = mailRef.current.value;
    const password = passwordRef.current.value;

    if (!mail.trim() || !password.trim()) {
      toast('Por favor, rellene todos los campos', { icon: '⚠️' });
      return;
    }

    const loginData = { mail, password };
    mutation.mutate(loginData);
  };

  return (
    <>
      <Navbar links={data.navhome} img={'/'} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md w-full md:max-w-6xl max-w-4xl">
          <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center">
            <img src="login.png" alt="Descripción de la imagen" className="rounded-lg w-3/4 h-auto md:w-full" />
          </div>
          <div className="md:w-1/2 w-full pl-0 md:pl-8 flex flex-col justify-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Iniciar Sesión</h2>
            <form className="flex flex-col" onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mail">
                  Identificaión
                </label>
                <input
                  ref={mailRef}
                  type="email"
                  id="mail"
                  name='mail'
                  placeholder="Ingresa tu correo"
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
                <Button onClick={handleLogin} text="Ingresar" className="bg-orange-500 text-white px-4 py-2 rounded" />
              </div>
              <p className="text-center text-gray-600 text-xs mt-4">
                 Inicio de sesión exclusivo para empleados, Política de privacidad de Flamingos Términos de servicio.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;








/*import React, { useRef, useContext } from 'react';
import Navbar from '../components/organisms/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Button from '../components/atoms/Button';
import { data } from '../data/data';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';

function Login() {
  const mailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const value = useContext(UserContext);

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
      value.setUser(data.user)
      navigate('/home-empleados');
    },
    onError: (error) => {
      console.error('Error during login:', error);
      toast.error('Credenciales Incorrectas')
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const mail = mailRef.current.value;
    const password = passwordRef.current.value;

    if (!mail.trim() || !password.trim()) {
      toast('Por favor, rellene todos los campos', { icon: '⚠️' });
      return;
    }

    const loginData = { mail, password };
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mail">
              Identificación
            </label>
            <input
              ref={mailRef}
              type="mail"
              id="mail"
              name='mail'
              placeholder="Ingresa tu correo"
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

export default Login;*/



















/*import React, { useRef, useContext } from 'react';
import Navbar from '../components/organisms/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Button from '../components/atoms/Button';
import { data } from '../data/data';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';

function Login() {
  const mailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const value = useContext(UserContext);

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
      value.setUser(data.user)
      navigate('/home-empleados');
    },
    onError: (error) => {
      console.error('Error during login:', error);
      toast.error('Credenciales Incorrectas')
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const mail = mailRef.current.value;
    const password = passwordRef.current.value;

    if (!mail.trim() || !password.trim()) {
      toast('Por favor, rellene todos los campos', { icon: '⚠️' });
      return;
    }

    const loginData = { mail, password };
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mail">
              Identificación
            </label>
            <input
              ref={mailRef}
              type="mail"
              id="mail"
              name='mail'
              placeholder="Ingresa tu correo"
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

export default Login;*/
