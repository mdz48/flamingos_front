import React from 'react';
import MenuList from '../molecules/MenuList';

const MenuContainer = ({ items }) => {
  return (
    <div className="space-y-4">
    {items.map((item, index) => (
      <button 
        key={index} 
        className="w-full  bg-red-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-orange-600 transition-colors duration-200"
      >
        {item}
      </button>
    ))}
  </div>
  );
};

export default MenuContainer;
