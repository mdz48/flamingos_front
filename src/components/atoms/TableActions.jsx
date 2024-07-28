import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <td className="px-4 py-2 border-gray-200 text-center border-b-2">
      <button className="px-2   text-white" onClick={onEdit}>
        <FaEdit className="mr-1 fill-black  " />
        
      </button>
      <button className="px-2 text-white" onClick={onDelete}>
        <FaTrashAlt className="fill-black"/>
        
      </button>
    </td>
  );
};

export default TableActions;
