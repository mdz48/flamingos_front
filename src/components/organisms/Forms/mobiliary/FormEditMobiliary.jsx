import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function EditFormMobiliary({ onClose }) {
    const idRef = useRef('');
    const idsalonRef = useRef('');
    const nameRef = useRef('');
    const stockRef = useRef('');
    const stateRef = useRef('');
    const availableRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/mobiliary/${idRef.current.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['mobiliary']);
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
            "name": nameRef.current.value,
            "stock": stockRef.current.value,
            "state": stateRef.current.value,
            "available_stock" : stockRef.current.value,
            "description": "none",
            "updated_by": "Max",
        };
        mutation.mutate(newData);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='id' className='mb-1'> ID del Mobiliario </label>
                <input type='text' ref={idRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'/>
                <input type="text" ref={idsalonRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="stock">Cantidad</label>
                <label htmlFor='name' className='mb-1'> Nombre </label>
                <input type='text' ref={nameRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'/>
                <label htmlFor="stock" className="mb-1">Cantidad</label>
                <input
                type="text"
                ref={stockRef}
                className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label htmlFor="state" className="mb-1">
                Estado
                </label>
                <input
                type="text"
                ref={stateRef}
                className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label htmlFor="available" className="mb-1">
                Disponibles
                </label>
                <input
                type="text"
                ref={availableRef}
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
