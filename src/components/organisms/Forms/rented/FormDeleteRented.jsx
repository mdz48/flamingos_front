import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormDeleteRented({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (reservationId) => { 
            return fetch(`${import.meta.env.VITE_URL}/reservation/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('reservation');
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting client:', error);
            alert('No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const reservationId = idRef.current.value;
        mutation.mutate(reservationId);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='reservationId'>Client ID</label>
                <input type='text' ref={idRef} className='border-2 mb-4' />
                <div className='flex items-center justify-between'>
                    <Button onClick={handleClick} text='Delete' />
                    <Button onClick={onClose} text='Cerrar'/>
                </div>
            </form>
        </div>
    );
}