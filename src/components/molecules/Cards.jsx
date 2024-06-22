import React from 'react'
import Picture from '../atoms/Picture'
import Paragraph from '../atoms/Paragraph'

export default function Cards() {
  return (
    <div className='flex'>
      <div><Picture img={"vite.svg"}/></div>
      <div><Paragraph text={"puto"}/></div>
    </div>
  )
}
