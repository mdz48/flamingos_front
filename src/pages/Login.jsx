import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/molecules/Navbar';
import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';
import Footer from '../components/molecules/Footer';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <Field
              id="email"
              text="Correo Electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              val={email}
              fnVal={setEmail}
            />
            <Field
              id="password"
              text="Contraseña"
              type="password"
              placeholder="••••••••"
              val={password}
              fnVal={setPassword}
            />
            <Button type="submit" text="Ingresar" className="w-full mt-4" />
            <div className="text-center mt-4">
              <Link to="/recover-password" className="text-blue-500 hover:underline">Recuperar Contraseña</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
