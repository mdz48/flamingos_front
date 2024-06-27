import React from 'react';
import TableCell from '../atoms/TableCell';

const TableRow = ({ data, className }) => {
  return (
    <tr className={className}>
      {data.map((cell, index) => (
        <TableCell key={index} className={cell.className}>
          {cell.content}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;
