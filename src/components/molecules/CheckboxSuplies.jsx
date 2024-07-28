import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '../atoms/Checkbox'; 

const CheckboxSupplies = ({ onChange }) => {
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  const { data: suppliesData, error, isLoading } = useQuery({
    queryKey: ['supplies'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/supplies/summaries`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  const handleCheckboxChange = (supply) => {
    const isSelected = selectedSupplies.some(selected => selected.supplies_id === supply.supplies_id);
    let updatedSupplies;

    if (isSelected) {
      updatedSupplies = selectedSupplies.filter(selected => selected.supplies_id !== supply.supplies_id);
    } else {
      updatedSupplies = [...selectedSupplies, supply];
    }

    setSelectedSupplies(updatedSupplies);
    onChange(updatedSupplies);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading supplies data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supplies</h1>
      {suppliesData && suppliesData.map(supply => (
        <div key={supply.supplies_id} className="mb-2">
          <Checkbox
            label={supply.name}
            checked={selectedSupplies.some(selected => selected.supplies_id === supply.supplies_id)}
            onChange={() => handleCheckboxChange(supply)}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxSupplies;
