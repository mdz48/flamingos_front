// import React from 'react'
import { links } from "../../data/data"

export default function Navbar() {
  return (
    <>
    <div className='flex bg-green-300'>
        <img src="vite.svg" alt="Page Logo" />
        <ul className='flex '>
        {
          links.map((link, i) => <li key={i}><a href={link.link}>{link.site}</a></li>)
        }
        </ul>
    </div>
    </>
  )
}
