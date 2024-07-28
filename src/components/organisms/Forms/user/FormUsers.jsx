import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormUsers({ onClose }) {
    const mailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const passwordRef = useRef(null);
    const queryClient = useQueryClient();
    const [role, setRole] = useState(null);

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        console.log(errorData);
                        throw new Error(errorData.message || 'Error al guardar el usuario');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            toast.success('Usuario guardado exitosamente');
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;

                const newData = {
                    mail : mailRef.current.value,
                    firstname: firstNameRef.current.value,
                    lastname: lastNameRef.current.value,
                    role_user_id_fk: role,
                    password: passwordRef.current.value,
                    created_by: userName,
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

    const handleBlur = (e) => {
        if (e.target.value == 'Administrador') {
            setRole(1);
        } else setRole(2)
    }

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='firstname' className='block mb-1'>Correo Electrónico</label>
                <input type='mail' ref={mailRef} className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'/>
                <label htmlFor='firstname' className='block mb-1'>Nombre</label>
                <input
                    type='text'
                    ref={firstNameRef}
                    className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
        
                <label htmlFor='lastname' className='block mb-1'>Apellido</label>
                <input
                    type='text'
                    ref={lastNameRef}
                    className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
            
        
                <label htmlFor='role' className='block mb-1'>Rol</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">-- Seleccione una opción --</option>
                <option value={1}>Administrador</option>
                <option value={2}>Empleado</option>
                </select>
                <label htmlFor='password' className='block mb-1'>Contraseña</label>
                <input
                    type='password'
                    ref={passwordRef}
                    className='border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
            
            <div className='flex items-center justify-between mt-4'>
                <Button onClick={handleClick} text='Guardar' />
                <Button onClick={onClose} text='Cerrar' />
            </div>
            </form>
        </div>
    );
}
