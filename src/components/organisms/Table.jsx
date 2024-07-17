import React from 'react';
import TableRow from '../molecules/TableRow';

const Table = ({ headers, rows, className }) => {
  return (
    <table className={`min-w-small max-h-3/4 bg-white shadow-md ${className}`}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border-b-2 border-gray-300">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index} data={row} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
