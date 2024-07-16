import React from 'react';
import Button from '../atoms/Button';

function MenuList({ items }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li key={index}>
          <Button text={item} className="w-full text-left" onClick={() => {}} />
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
