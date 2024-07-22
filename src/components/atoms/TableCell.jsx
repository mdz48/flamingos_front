import React from 'react';

const TableCell = ({ children, className }) => {
  return (
    <td className={`px-4 py-2 w-full ${className}`}>
      {children}
    </td>
  );
};

export default TableCell;
