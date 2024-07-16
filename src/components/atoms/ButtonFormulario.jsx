import React from "react"

function ButtonFormulario(props){
    return(
        <button
        onClick={props.onClick}
        className="w-4/5 h-12 bg-blue-800 rounded-lg text-white text-lg shadow-md my-1 hover:bg-blue-600"
    >
        {props.text}
    </button>
    )
}

export default ButtonFormulario