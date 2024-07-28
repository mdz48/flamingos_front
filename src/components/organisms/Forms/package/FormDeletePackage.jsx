import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormDeletePackage({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (packageTypeId) => {
            const response = await fetch(`${import.meta.env.VITE_URL}/packageTypes/${packageTypeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el paquete');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries('packageTypes');
            toast.success('Eliminado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting package:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const packageTypeId = idRef.current.value;
        if (!packageTypeId) {
            toast.error('Ingrese un ID');
            return;
        }
        mutation.mutate(packageTypeId);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='packageTypeId'>ID de Reserva</label>
                <input type='text' ref={idRef} className='border-2 mb-4' />
                <div className='flex items-center justify-between'>
                    <Button onClick={handleClick} text='Eliminar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
