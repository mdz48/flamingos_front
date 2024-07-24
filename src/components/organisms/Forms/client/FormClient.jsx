import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormClient({ onClose }) {
    const firstnameRef = useRef('');
    const lastnameRef = useRef('');
    const cellphoneRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newData) => {
            const response = await fetch(`${import.meta.env.VITE_URL}/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar el cliente');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['client']);
            toast.success("Registro Exitoso");
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(error.message || 'Ocurrió un error');
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
                    "firstname": firstnameRef.current.value,
                    "lastname": lastnameRef.current.value,
                    "cellphone": cellphoneRef.current.value,
                    "updated_by": userName,
                    "created_by": userName,
                };
                mutation.mutate(newData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No user found in localStorage");
        }
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='username' className='mb-1'>Nombre</label>
                <input
                    type='text'
                    ref={firstnameRef}
                    className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
                <label htmlFor='lastname' className='mb-1'> Apellido </label>
                <input
                    type='text'
                    ref={lastnameRef}
                    className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
                <label htmlFor='telefono' className='mb-1'>Teléfono</label>
                <input
                    type='number'
                    ref={cellphoneRef}
                    className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
