import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormUsers({ onClose }) {
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const roleRef = useRef('');
    const passwordRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al guardar el usuario');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            toast.success('Usuario guardado exitosamente');
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;

                const newData = {
                    firstname: firstNameRef.current.value,
                    lastname: lastNameRef.current.value,
                    role_user_id_fk: roleRef.current.value,
                    password: passwordRef.current.value,
                    created_by: userName,
                    updated_by: userName,
                };

                mutation.mutate(newData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                toast.error('Error al procesar los datos del usuario');
            }
        } else {
            toast.error('No se encontró información del usuario en localStorage');
        }
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <div>
                    <label htmlFor='firstname' className='block mb-1'>Nombre</label>
                    <input
                        type='text'
                        ref={firstNameRef}
                        className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </div>
                <div>
                    <label htmlFor='lastname' className='block mb-1'>Apellido</label>
                    <input
                        type='text'
                        ref={lastNameRef}
                        className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </div>
                <div>
                    <label htmlFor='role' className='block mb-1'>Rol</label>
                    <input
                        type='number'
                        ref={roleRef}
                        className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block mb-1'>Contraseña</label>
                    <input
                        type='password'
                        ref={passwordRef}
                        className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
