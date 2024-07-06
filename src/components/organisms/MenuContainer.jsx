import React from 'react';
import MenuList from '../molecules/MenuList';

const MenuContainer = ({ items }) => {
  return (
    <div className="space-y-4">
      <MenuList items={items} />
    </div>
  );
};

export default MenuContainer;
