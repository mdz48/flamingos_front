import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormMobiliary({ onClose }) {
    const nameRef = useRef('');
    const stockRef = useRef('');
    const stateRef = useRef('');
    const idsalonRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/mobiliary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['mobiliary']);
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            alert('No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const newData = {
            name: nameRef.current.value,
            stock: stockRef.current.value,
            state: stateRef.current.value,
            salon_id_fk: idsalonRef.current.value,
            description: 'none',
            updated_by: 'Max',
            created_by: 'Max',
        };
        mutation.mutate(newData);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor="name">Nombre</label>
                <input type="text" ref={nameRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="salon">ID Salon</label>
                <input type="text" ref={idsalonRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="stock">Cantidad</label>
                <input type="number" ref={stockRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="state">Estado</label>
                <input type="text" ref={stateRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
