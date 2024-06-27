import React from 'react';

function Field({ text, type, placeholder, val, fnVal }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={val}
        onChange={(e) => fnVal(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

export default Field;
