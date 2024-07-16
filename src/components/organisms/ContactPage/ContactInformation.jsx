import React from 'react'
import Heading from '../../atoms/Heading'
import Paragraph from '../../atoms/Paragraph'

export default function (props) {
  return (
    <div>
        <Heading text={props.head}/>
        <Paragraph text={props.location}/>
        <Paragraph text={props.contact}/>
    </div>
  )
}
