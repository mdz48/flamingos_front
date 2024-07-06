import React from "react";

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            className="w-full h-10 border border-gray-400 rounded-lg text-lg text-blue-800 px-2"
        />
    );
}

export default Input;
