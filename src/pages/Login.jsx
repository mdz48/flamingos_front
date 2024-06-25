import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'info',
                title: 'Please',
                text: 'Fill out all fields!',
            });
        } else {
            // Implement login logic here
            Swal.fire({
                title: 'Success',
                text: 'Login successful!',
                icon: 'success',
            });
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <Field id="email" text="Email" type="email" placeholder="email@example.com" val={email} fnVal={setEmail} />
            <Field id="password" text="Password" type="password" placeholder="*****" val={password} fnVal={setPassword} />
            <Button onClick={handleLogin}>Login</Button>
            <Link to="/recover-password" className="recover-password-link">Recover Password</Link>
        </div>
    );
}

export default Login;
