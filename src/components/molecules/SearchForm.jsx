import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearchClick}>Buscar</Button>
    </div>
  );
};

export default SearchForm;
