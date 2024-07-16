import { useRef } from 'react';

export default function FormRentMobiliary({ onClose }) {
    const usernameRef = useRef('');
    const rentsatrRef = useRef('');
    const rentendRef = useRef('');
    const suplierRef = useRef('');
    const descriptionRef = useRef('');
    const costRef = useRef('');
    
    
    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_URL}/mobiliary`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            // body: JSON.stringify({
            //     "name": usernameRef.current.value,
            //     "cost": passwordRef.current.value,
            //     "updated_by" : "Leo",
            //     "created_by" : "E'pendejo",
            //     "deleted" : 0
            // }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert('No se pudo hacer conexión');
            }
        })
        .then(data => {
            console.log(data);
            // localStorage.setItem('token', data.token)
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor="username">Name
                    <input type="text" ref={usernameRef} className='border-2' />
                </label>
                <label htmlFor='suplier'>proveedor
                    <input type='text' ref={suplierRef} className='border-2'/> 
                </label>
                <label htmlFor="description">Descripcion
                    <input type="text" ref={descriptionRef} className='border-2' />
                </label>
                <label htmlFor="password">Costo
                    <input type="number" ref={costRef} className='border-2' />
                </label>
                <label htmlFor="entrada">fecha de entrada
                    <input type="date" ref={rentsatrRef} className='border-2' />
                </label>
                <label htmlFor="entrada">fecha de salida
                    <input type="date" ref={rentendRef} className='border-2' />
                </label>
                <div className='flex items-center justify-between mt-4'>
                    <button onClick={handleClick} className={`bg-orange-700 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>Save</button>
                    <button onClick={onClose} className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'>Cerrar</button>
                </div>
            </form>
        </div>
    );
}
