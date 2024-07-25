import React from 'react';

const Combobox = ({ items, labelKey, onChange }) => {
  return (
    <div className="relative">
      <select 
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map((item, index) => (
          <option key={index} value={item[labelKey]}>
            {item[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;
