import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormClient({ onClose }) {
    const firstnameRef = useRef('');
    const lastnameRef = useRef('');
    const cellphoneRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['client']);
            onClose();
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            alert('No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const newData = {
            "firstname": firstnameRef.current.value,
            "lastname": lastnameRef.current.value,
            "cellphone": cellphoneRef.current.value,
            "updated_by": 'Leo',
            "created_by": 'E menso',
        };
        mutation.mutate(newData);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='username' className='mb-1'>
                    Nombre
                    <input
                        type='text'
                        ref={firstnameRef}
                        className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </label>
                <label htmlFor='lastname' className='mb-1'>
                    Apellido
                    <input
                        type='text'
                        ref={lastnameRef}
                        className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </label>
                <label htmlFor='telefono' className='mb-1'>
                    Teléfono
                    <input
                        type='number'
                        ref={cellphoneRef}
                        className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </label>
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
