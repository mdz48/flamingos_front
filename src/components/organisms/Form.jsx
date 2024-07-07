import { useRef } from 'react'

export default function Form() {
    const usernameRef = useRef('')
    const passwordRef = useRef('')
    
    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_URL}/supplies`, {
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
                return response.json()
            } else {
                alert('No se pudo hacer conexión')
            }
        })
        .then(data => {
            console.log(data);
            // localStorage.setItem('token', data.token)
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <form className='flex flex-col'>
            <label htmlFor="username">Name
                <input type="text" ref={usernameRef} className='border-2' />
            </label>
            <label htmlFor="password">Password
                <input type="password" ref={passwordRef} className='border-2' />
            </label>
            <button onClick={handleClick} className='w-12'>Save</button>
        </form>
    )
}