// src/pages/MobiliarioPage.jsx

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Combobox from '../atoms/Combobox';

const ComboboxSalon = () => {
  const [selectedMobiliario, setSelectedMobiliario] = useState(null);
  const [role, setRole] = useState(null);

  const { data: salonData, error, isLoading } = useQuery({
    queryKey: ['salon'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/salon/summaries`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User:', parsedUser);
     
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  const handleMobiliarioChange = (selectedValue) => {
    setSelectedMobiliario(selectedValue);
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
          onChange={handleMobiliarioChange} 
        />
      )}
      {selectedMobiliario && (
        <div className="mt-4">
          <p>Selected Mobiliario: {selectedMobiliario}</p>
        </div>
      )}
    </div>
  );
};

export default ComboboxSalon;
