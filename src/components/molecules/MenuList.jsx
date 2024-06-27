import React from 'react';
import MenuItem from '../atoms/MenuItem';

const MenuList = ({ items }) => {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <MenuItem key={index} label={item} />
      ))}
    </ul>
  );
};

export default MenuList;
