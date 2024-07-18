import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormUsers({ onClose }) {
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const roleRef = useRef('');
    const passwordRef = useRef('');
    const createdByRef = useRef('');
    const updatedByRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            alert('No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const newData = {
            firstname: firstNameRef.current.value,
            lastname: lastNameRef.current.value,
            role_user_id_fk: roleRef.current.value,
            password: passwordRef.current.value,
            created_by: "Max",
            updated_by: "Max",
        };
        mutation.mutate(newData);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor="firstname">Nombre</label>
                <input type="text" ref={firstNameRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="lastname">Apellido</label>
                <input type="text" ref={lastNameRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="role">Rol</label>
                <input type="number" ref={roleRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" ref={passwordRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
