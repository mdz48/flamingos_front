import React from 'react';
import TableCell from '../atoms/TableCell';

const TableRow = ({ data, className }) => {
  return (
    <tr className={className}>
      {data.map((cell, index) => (
        <TableCell key={index} className="px-4 py-2 border-b border-gray-200">
          {cell}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;
