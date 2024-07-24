import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormEditUsers({ onClose }) {
    const idRef = useRef('');
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const roleRef = useRef('');
    const passwordRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newData) => {
            const response = await fetch(`${import.meta.env.VITE_URL}/user/${idRef.current.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el usuario');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            toast.success('Usuario actualizado exitosamente');
        },
        onError: (error) => {
            console.error('Error updating data:', error);
            toast.error(error.message || 'Ocurrió un error');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const userValue = localStorage.getItem('user');

        if (userValue) {
            try {
                const userObject = JSON.parse(userValue);
                const userName = userObject.firstname;
                const newData = {
                    firstname: firstNameRef.current.value,
                    lastname: lastNameRef.current.value,
                    role_user_id_fk: roleRef.current.value,
                    password: passwordRef.current.value,
                    updated_by: userName,
                };
                mutation.mutate(newData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                toast.error('Error al procesar datos del usuario');
            }
        } else {
            console.log('No user found in localStorage');
            toast.error('No se encontró el usuario en localStorage');
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md">
            <form className="flex flex-col">
                <label htmlFor="id" className="mb-1">ID del Usuario</label>
                <input
                    type="text"
                    ref={idRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="firstname">Nombre</label>
                <input
                    type="text"
                    ref={firstNameRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="lastname">Apellido</label>
                <input
                    type="text"
                    ref={lastNameRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="role">Rol</label>
                <input
                    type="number"
                    ref={roleRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    ref={passwordRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <div className="flex items-center justify-between mt-4">
                    <Button onClick={handleClick} text="Guardar" />
                    <Button onClick={onClose} text="Cerrar" />
                </div>
            </form>
        </div>
    );
}
