import { useRef } from 'react';

export default function Rent({ onClose }) {
    const usernameRef = useRef('');
    const lastnameRef = useRef('');
    const cellphoneRef = useRef('');
    
    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_URL}/client`, {
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
                <label htmlFor="username">Name
                    <input type="text" ref={lastnameRef} className='border-2' />
                </label>
                <label htmlFor="telefono">Telefono
                    <input type="number" ref={cellphoneRef} className='border-2' />
                </label>
                <div className='flex items-center justify-between mt-4'>
                    <button onClick={handleClick} className={`bg-orange-700 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>Save</button>
                    <button onClick={onClose} className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'>Cerrar</button>
                </div>
            </form>
        </div>
    );
}