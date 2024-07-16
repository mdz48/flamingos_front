import React from 'react';

const MenuItem = ({ label }) => {
  return (
    <li className="px-4 py-2  bg-red-600 hover:bg-orange-600  text-white cursor-pointer">
      {label}
    </li>
  );
};

export default MenuItem;
