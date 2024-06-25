import React from 'react';
import './Field.css';

function Field({ id, text, type, placeholder, val, fnVal }) {
    return (
        <div className="field">
            <label htmlFor={id} className="field-label">{text}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={val}
                onChange={(e) => fnVal(e.target.value)}
                className="field-input"
            />
        </div>
    );
}

export default Field;
