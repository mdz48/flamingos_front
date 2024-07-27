import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormDeleteRented({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (reservationId) => {
            const response = await fetch(`${import.meta.env.VITE_URL}/reservation/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar la reserva');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries('reservation');
            toast.success('Eliminado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting reservation:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const reservationId = idRef.current.value;
        if (!reservationId) {
            toast.error('Ingrese un ID');
            return;
        }
        mutation.mutate(reservationId);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='reservationId'>ID de Reserva</label>
                <input type='text' ref={idRef} className='border-2 mb-4' />
                <div className='flex items-center justify-between'>
                    <Button onClick={handleClick} text='Eliminar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
