import React from 'react';
import TableCell from '../atoms/TableCell';
import TableActions from '../atoms/TableActions';

const TableRow = ({ data, className, onEdit, onDelete }) => {
  return (
    <tr className={className}>
      {data.map((cell, index) => (
        <TableCell key={index} className="px-4 py-2 border-gray-200 w-1/7">
          {cell}
        </TableCell>
      ))}
      <TableActions onEdit={onEdit} onDelete={onDelete} />
    </tr>
  );
};

export default TableRow;
