import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormRentMobiliary({ onClose }) {
    const nameRef = useRef('');
    const costRef = useRef('');
    const descriptionRef = useRef('');
    const providerRef = useRef('');
    const entryDateRef = useRef('');
    const exitDateRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/rentedmobiliary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al registrar el mobiliario alquilado');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rentedMobiliary']);
            toast.success('Mobiliario registrado exitosamente');
            onClose();
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
                    name: nameRef.current.value,
                    rental_cost: costRef.current.value,
                    description: descriptionRef.current.value,
                    rented_by: providerRef.current.value,
                    rental_start_date: entryDateRef.current.value,
                    rental_end_date: exitDateRef.current.value,
                    updated_by: userName,
                    created_by: userName,
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
                <label htmlFor="name" className='mb-1'>Nombre</label>
                <input
                    type="text"
                    ref={nameRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="cost" className='mb-1'>Costo</label>
                <input
                    type="number"
                    ref={costRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="description" className='mb-1'>Descripción</label>
                <input
                    type="text"
                    ref={descriptionRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="provider" className='mb-1'>Proveedor</label>
                <input
                    type="text"
                    ref={providerRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="entryDate" className='mb-1'>Fecha de Entrada</label>
                <input
                    type="date"
                    ref={entryDateRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="exitDate" className='mb-1'>Fecha de Salida</label>
                <input
                    type="date"
                    ref={exitDateRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
