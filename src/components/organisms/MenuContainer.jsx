import React from 'react';
import Button from '../atoms/Button';

function MenuContainer({ items, onMenuClick }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, index) => (
        <li key={index}>
          <Button text={item} className="w-full text-left" onClick={() => onMenuClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default MenuContainer;
