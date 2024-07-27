import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ComboboxSalon from '../../../molecules/ComboboxSalon';
import CheckboxPackage from '../../../molecules/CheckboxPackage';
import Button from '../../../atoms/Button';
import FormClient from '../client/FormClient';
import ComboboxClient from '../../../molecules/ComboboxClient';
import toast from 'react-hot-toast';

const FormRented = ({ onClose }) => {
    const [salon, setSalon] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [cantidadInvitados, setCantidadInvitados] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
    const [paquete, setPaquete] = useState(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['salon']);
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(salon);
        if (!salon || !cliente || !paquete) {
            toast.error('Por favor, asegúrese de rellenar los campos');
            return;
        }

        const newData = {
            salon_id: salon.salon_id,
            client_id_fk: cliente.client_id,
            guest_amount: cantidadInvitados,
            event_type: tipoEvento,
            event_date: fechaEvento,
            package_type_id_fk: paquete.package_id,
        };
        mutation.mutate(newData);
    };

    const handleCloseClick = () => {
        setSalon(null);
        setCliente(null);
        setCantidadInvitados('');
        setTipoEvento('');
        setFechaEvento('');
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
        <form className="relative p-4 max-w-md mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <ComboboxSalon onChange={setSalon} />

            <div className="mt-4 flex space-x-4">
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
                    <FormClient onClose={() => setCliente(null)} />
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
                    value={cantidadInvitados}
                    onChange={(e) => setCantidadInvitados(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Tipo de Evento:</label>
                <input
                    type="text"
                    value={tipoEvento}
                    onChange={(e) => setTipoEvento(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Fecha del Evento:</label>
                <input
                    type="date"
                    value={fechaEvento}
                    onChange={(e) => setFechaEvento(e.target.value)}
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
