import React from 'react';
import MenuItem from '../atoms/MenuItem';

const HorizontalMenu = ({ items }) => {
  return (
    <ul className="flex">
      {items.map((item, index) => (
        <MenuItem key={index} label={item} />
      ))}
    </ul>
  );
};

export default HorizontalMenu;