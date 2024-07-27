// src/pages/MobiliarioPage.jsx

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '../atoms/Checkbox';

const CheckboxSuplies = () => {
  const [role, setRole] = useState(null);

  const { data: insumosData, error, isLoading } = useQuery({
    queryKey: ['suplies'],
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


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading insumos data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">insumos</h1>
      {insumosData && <Checkbox items={insumosData} />}
    </div>
  );
};

export default CheckboxSuplies;
