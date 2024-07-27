import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ComboboxSalon from '../../../molecules/ComboboxSalon';
import CheckboxPackage from '../../../molecules/CheckboxPackage';
import Button from '../../../atoms/Button';
import FormClient from '../client/FormClient';
import ComboboxClient from '../../../molecules/ComboboxClient';
import toast from 'react-hot-toast';

const FormEditRented = ({ onClose }) => {
    const reservationIdRef = useRef('');
    const cantidadInvitadosRef = useRef('');
    const tipoEventoRef = useRef('');
    const fechaEventoRef = useRef('');
    const [salon, setSalon] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [paquete, setPaquete] = useState(null);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const fetchReservationData = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/reservation/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            // Actualiza los campos con los datos obtenidos
            setSalon({ salon_id: data.salon_id_fk });
            setCliente({ client_id: data.client_id_fk });
            setPaquete({ package_type_id: data.package_type_id_fk });
            cantidadInvitadosRef.current.value = data.guest_amount || '';
            tipoEventoRef.current.value = data.event_type || '';
            fechaEventoRef.current.value = data.event_date ? new Date(data.event_date).toISOString().split('T')[0] : '';
        } catch (error) {
            toast.error('No existe este ID de reservación');
            console.error('Error fetching reservation data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlur = () => {
        const reservationId = reservationIdRef.current.value;
        if (reservationId) {
            fetchReservationData(reservationId);
        }
    };

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/reservation/${reservationIdRef.current.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al guardar la reserva');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reservation']);
            toast.success('Reservación actualizada');
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationId = reservationIdRef.current.value;
        const cantidadInvitados = cantidadInvitadosRef.current.value;
        const tipoEvento = tipoEventoRef.current.value;
        const fechaEvento = fechaEventoRef.current.value;

        if (!reservationId) {
            toast.error('Por favor, ingrese un ID');
            return;
        }

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;
                const newData = {
                    reservation_id: reservationId,
                    salon_id_fk: salon ? salon.salon_id : null,
                    client_id_fk: cliente ? cliente.client_id : null,
                    guest_amount: cantidadInvitados || null,
                    event_type: tipoEvento || null,
                    event_date: fechaEvento || null,
                    package_type_id_fk: paquete ? paquete.package_type_id : null,
                    updated_by: userName,
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
        reservationIdRef.current.value = '';
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
            <div className="mt-4">
                <label className="block text-gray-700">ID de Reserva:</label>
                <input
                    type="text"
                    ref={reservationIdRef}
                    onBlur={handleBlur}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

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
                <Button onClick={handleSubmit} text="Guardar" disabled={loading} />
                <Button onClick={handleCloseClick} text="Cerrar" />
            </div>
        </form>
    );
};

export default FormEditRented;
