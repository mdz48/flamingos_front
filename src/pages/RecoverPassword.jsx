import React, { useState } from 'react';
import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';
import './RecoverPassword.css';

function RecoverPassword() {
    const [email, setEmail] = useState('');

    const handleRecoverPassword = () => {
        if (!email.trim()) {
            Swal.fire({
                icon: 'info',
                title: 'Please',
                text: 'Enter your email to recover your password!',
            });
        } else {
            // Implement password recovery logic here
            Swal.fire({
                title: 'Success',
                text: 'Password recovery instructions have been sent to your email!',
                icon: 'success',
            });
        }
    };

    return (
        <div className="recover-password">
            <h2>Recover Password</h2>
            <Field id="email" text="Email" type="email" placeholder="email@example.com" val={email} fnVal={setEmail} />
            <Button onClick={handleRecoverPassword}>Send Recovery Email</Button>
        </div>
    );
}

export default RecoverPassword;
