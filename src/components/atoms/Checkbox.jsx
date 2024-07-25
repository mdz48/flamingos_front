import React from 'react';

const Checkbox = ({ items }) => {
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <label key={index} className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-indigo-600" />
          <span className="ml-2">{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
