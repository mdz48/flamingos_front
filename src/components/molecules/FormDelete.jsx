import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const DeleteForm = ({ onDelete }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete(query);
  };

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Buscar para eliminar..."
        value={query}
        onChange={handleInputChange}
      />
      <Button onClick={handleDeleteClick}>Eliminar</Button>
    </div>
  );
};

export default DeleteForm;
