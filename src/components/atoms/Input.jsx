import React from 'react';

const Input = ({ className = '', ...rest }) => {
    return (
        <input
            className={`border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
            {...rest}
        />
    );
};

export default Input;
