import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from "react-hot-toast";

export default function FormDeleteSalon({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (salonId) => {
            const response = await fetch(`${import.meta.env.VITE_URL}/salon/${salonId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el salón');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['salon']);
            toast.success("Salón eliminado exitosamente");
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting salon:', error);
            toast.error(error.message || 'Ocurrió un error');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const salonId = idRef.current.value;
        if (salonId) {
            mutation.mutate(salonId);
        } else toast.error('Por favor, ingrese un ID')
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='salonId' className='mb-1'>ID del Salón</label>
                <input type='text' ref={idRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Eliminar' />
                    <Button onClick={onClose} text='Cerrar'/>
                </div>
            </form>
        </div>
    );
}
