import React, { useState } from 'react';
import Field from '../components/molecules/Field';
import Label from '../components/atoms/Label';
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "info",
        title: "Please",
        text: "Fill out all fields!",
      });
    } else {
      // Aquí puedes agregar la lógica para manejar el inicio de sesión
      // Por ejemplo, verificar las credenciales contra una base de datos
      if (email === "test@example.com" && password === "password") {
        Swal.fire({
          title: "Good!",
          text: "Inicio de sesión exitoso!",
          icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Uyy.",
          text: "Credenciales incorrectas!",
        });
      }
    }
  };

  return (
    <div id="login_section">
      <Label text="Iniciar Sesión" />
      <form onSubmit={handleLogin}>
        <Field text="Email" type="email" placeholder="example@example.com" val={email} fnVal={setEmail} />
        <Field text="Contraseña" type="password" placeholder="*****" val={password} fnVal={setPassword} />
        <Button text="Iniciar Sesión" />
      </form>
    </div>
  );
}

export default Login;
