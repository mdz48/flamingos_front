import React from 'react';

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <td className="px-4 py-2 border-gray-100 text-center border-b-2">
      <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={onEdit}>
        Editar
      </button>
      <button className="px-2 py-1 bg-red-500 text-white rounded ml-2" onClick={onDelete}>
        Borrar
      </button>
    </td>
  );
};

export default TableActions;
