import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ComboboxSalon from '../../../molecules/ComboboxSalon';
import CheckboxPackage from '../../../molecules/CheckboxPackage';
import Button from '../../../atoms/Button';
import FormClient from '../client/FormClient';
import ComboboxClient from '../../../molecules/ComboboxClient';
import toast from 'react-hot-toast';
import { MdUpdateDisabled } from 'react-icons/md';

const FormRented = ({ onClose }) => {
    const [salon, setSalon] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [paquete, setPaquete] = useState(null);
    const queryClient = useQueryClient();

    const cantidadInvitadosRef = useRef();
    const tipoEventoRef = useRef();
    const fechaEventoRef = useRef();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reservation']);
            toast.success('Reservación agendada')
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cantidadInvitados = cantidadInvitadosRef.current.value;
        const tipoEvento = tipoEventoRef.current.value;
        const fechaEvento = fechaEventoRef.current.value;

        if (!salon || !cliente || !paquete || !cantidadInvitados || !tipoEvento || !fechaEvento) {
            toast.error('Por favor, asegúrese de rellenar los campos');
            return;
        }


        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;     
                const newData = {
                    salon_id_fk: salon.salon_id,
                    client_id_fk: cliente.client_id,
                    guest_amount: cantidadInvitados,
                    event_type: tipoEvento,
                    event_date: fechaEvento,
                    package_type_id_fk: paquete.package_type_id,
                    created_by: userName,
                    updated_by: userName
                };
                mutation.mutate(newData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No user found in localStorage");
        }
    };

    const handleCloseClick = () => {
        setSalon(null);
        setCliente(null);
        setPaquete(null);
        onClose();
    };

    const handleClienteExistenteClick = () => {
        setCliente('clienteExistente');
    };

    const handleNuevoClienteClick = () => {
        setCliente('nuevoCliente');
    };

    const handlePaqueteChange = (selectedPaquete) => {
        setPaquete(selectedPaquete);
    };

    return (
        <form className="relative p-4  mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <ComboboxSalon onChange={setSalon} />

            <div className="mt-4 flex space-x-4 justify-center">
                <Button
                    text="Cliente Existente"
                    className={cliente === 'clienteExistente' ? 'bg-orange-500' : ''}
                    onClick={handleClienteExistenteClick}
                />
                <Button
                    text="Nuevo Cliente"
                    className={cliente === 'nuevoCliente' ? 'bg-orange-500' : ''}
                    onClick={handleNuevoClienteClick}
                />
            </div>

            {cliente === 'nuevoCliente' && (
                <div className="mt-4">
                    <FormClient onChange={setCliente} onClose={() => setCliente(null)} />
                </div>
            )}

            {cliente === 'clienteExistente' && (
                <div className="mt-4">
                    <ComboboxClient onChange={setCliente} />
                </div>
            )}

            <div className="mt-4">
                <CheckboxPackage onChange={handlePaqueteChange} />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Cantidad de Invitados:</label>
                <input
                    type="number"
                    ref={cantidadInvitadosRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Tipo de Evento:</label>
                <input
                    type="text"
                    ref={tipoEventoRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Fecha del Evento:</label>
                <input
                    type="date"
                    ref={fechaEventoRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-6 flex items-center justify-between">
                <Button onClick={handleSubmit} text="Guardar" />
                <Button onClick={handleCloseClick} text="Cerrar" />
            </div>
        </form>
    );
};

export default FormRented;
