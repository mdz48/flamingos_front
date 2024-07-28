import { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';
import ComboboxSalon from '../../../molecules/ComboboxSalon';

export default function EditFormMobiliary({ mobiliary, onClose }) {
    const idRef = useRef('');
    const [salon, setSalon] = useState(null);
    const nameRef = useRef('');
    const stockRef = useRef('');
    const stateRef = useRef('');
    const descriptionRef = useRef('');
    const queryClient = useQueryClient();

    useEffect(() => {
        if (mobiliary) {
            idRef.current.value = mobiliary.mobiliary_id;
            setSalon(mobiliary);
            nameRef.current.value = mobiliary.name;
            stockRef.current.value = mobiliary.stock;
            stateRef.current.value = mobiliary.state;
            descriptionRef.current.value = mobiliary.description;
        }
    }, [mobiliary]);

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/mobiliary/${mobiliary.mobiliary_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al actualizar el mobiliario');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['mobiliary']);
            toast.success('Mobiliario actualizado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error updating data:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const value = localStorage.getItem('user');
        if (value) {
            try {
                console.log(salon.salon_id);
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;
                const newData = {
                    name: nameRef.current.value,
                    salon_id_fk: salon.salon_id,
                    stock: stockRef.current.value,
                    state: stateRef.current.value,
                    description: descriptionRef.current.value,
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
                <label htmlFor='id' className='mb-1'>ID del Mobiliario</label>
                <input type='text' ref={idRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'/>
                <ComboboxSalon onChange={setSalon}/>
                <label htmlFor="name" className='mb-1'>Nombre</label>
                <input type='text' ref={nameRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'/>
                <label htmlFor="stock" className="mb-1">Cantidad</label>
                <input type="text" ref={stockRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="state" className="mb-1">Estado</label>
                <input type="text" ref={stateRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <label htmlFor="description" className="mb-1">Descripción</label>
                <input type="text" ref={descriptionRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                <div className="flex items-center justify-between mt-4">
                    <Button onClick={handleClick} text="Guardar" />
                    <Button onClick={onClose} text="Cerrar" />
                </div>
            </form>
        </div>
    );
}
