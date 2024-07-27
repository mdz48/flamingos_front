import React from 'react';
import TableRow from '../molecules/TableRow';

const Table = ({ headers, rows, className, onEdit, onDelete, role }) => {
  return (
    <table className={`min-w-small max-h-3/4 bg-white shadow-md ${className}`}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border-b-2 border-gray-300 w-1/7">
              {header}
            </th>
          ))}
          {role == 1 && (
            <th className="px-4 py-2 border-b-2 border-gray-300">Acciones</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow
            role = {role}
            key={index}
            data={row}
            onEdit={() => onEdit(row[0])} // assuming the first element in row is the id
            onDelete={() => onDelete(row[0])}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
