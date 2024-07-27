import React from 'react';

const Combobox = ({ items, labelKey, onChange }) => {
  return (
    <div className="relative">
      <select
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => {
          const selectedIndex = e.target.selectedIndex;
          if (selectedIndex === 0) {
            onChange(null); // No selecciona ninguna opción
          } else {
            onChange(items[selectedIndex - 1]); // Ajusta el índice
          }
        }}
      >
        <option disabled selected value="">
          -- Elije una opción --
        </option>
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
