import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Combobox from '../atoms/Combobox';

const ComboboxSalon = ({ onChange }) => {
  const [selectedSalon, setSelectedSalon] = useState(null);

  const { data: salonData, error, isLoading } = useQuery({
    queryKey: ['salon'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/salon/summaries`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  const handleSalonChange = (selectedSalon) => {
    setSelectedSalon(selectedSalon);
    onChange(selectedSalon); // Pasa el objeto completo del salón
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading salon data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Salon</h1>
      {salonData && (
        <Combobox 
          items={salonData} 
          labelKey="name" 
          onChange={handleSalonChange} 
        />
      )}
      {selectedSalon && (
        <div className="mt-4">
          <p>Selected Salon: {selectedSalon.name}</p>
          <p>Salon ID: {selectedSalon.salon_id}</p>
        </div>
      )}
    </div>
  );
};

export default ComboboxSalon;
